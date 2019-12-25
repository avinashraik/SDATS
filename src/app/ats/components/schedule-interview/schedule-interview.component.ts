import { Component, OnInit, Inject } from '@angular/core';
import { schedule, Candidate } from '../../models/candidate';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AtsService } from '../../service/ats.service';
import { NotificationServiceService } from 'src/app/core/services/notification-service.service';
import { MasterService } from 'src/app/master/service/master.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmailService } from 'src/app/shared/components/services/email.service';

@Component({
  selector: 'app-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styleUrls: ['./schedule-interview.component.scss']
})
export class ScheduleInterviewComponent implements OnInit {
  schedule: schedule = {};
  scheduleForm: FormGroup;
  interviewerList: any[] = [];
  interviewer: any = {};
  constructor(private fb: FormBuilder, private atsService: AtsService,
    private notification: NotificationServiceService, private masterService: MasterService,
    private emailService: EmailService,
              public dialogRef: MatDialogRef<ScheduleInterviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Candidate) { }

  ngOnInit() {
    this.interviewerList = [];
    this.interviewer = {};
    this.createForm();
    this.getInterviewerList();
  }
  createForm() {
    this.scheduleForm = this.fb.group({
      scheduleDate: ['', Validators.required],
      scheduleTime: ['', Validators.required],
      // canId: ['', Validators.required],
      interviewerId: ['', Validators.required],
    });
    this.scheduleForm.valueChanges.subscribe(console.log);
  }
  getInterviewerList() {
    this.masterService.getInterviewerList().subscribe(res => {
      this.interviewerList = [];
      res.docs.forEach(elem => {
        this.interviewer = {};
        this.interviewer.Id = elem.id;
        this.interviewer.InterviewerName = elem.data().Name;
        this.interviewer.Email = elem.data().Email;
        this.interviewerList.push(this.interviewer);
      });
    });
  }
  scheduleInterview() {
    this.schedule.candidateId = this.data.id;
    this.schedule.interviewerId = this.scheduleForm.controls.interviewerId.value;
    this.schedule.scheduleDate = new Date(this.scheduleForm.controls.scheduleDate.value).toDateString();
    this.schedule.scheduleTime = this.scheduleForm.controls.scheduleTime.value;
    this.atsService.scheduleInterview(this.schedule).then(res => {
      this.emailService.sendScheduleMail(this.data, this.interviewer, this.schedule);
      this.statusUpdate(this.data.id);
      this.notification.success('Interview scheduled for ' + this.data.name);
      this.dialogRef.close();
    });
  }
  statusUpdate(id) {
    this.data.status = String(4);
    this.atsService.updateStatus(id, this.data).then(res => {
    }).catch(err => {
      this.notification.success('Something went wrong while updating status');
    })
  }
}
