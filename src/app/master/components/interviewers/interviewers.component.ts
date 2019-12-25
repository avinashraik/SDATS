import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { NotificationServiceService } from 'src/app/core/services/notification-service.service';
import { MatDialog } from '@angular/material';
import { LoaderService } from 'src/app/shared/components/services/loader.service';
import { InterviewerModel } from '../../Models/configuration-model';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';

@Component({
  selector: 'app-interviewers',
  templateUrl: './interviewers.component.html',
  styleUrls: ['./interviewers.component.scss']
})
export class InterviewersComponent implements OnInit {

  isEdit = false;
  interviewerForm: FormGroup;
  interviewer;
  interviewerList: any[] = [];
  platform;
  platformList: any[] = [];
  constructor(private fb: FormBuilder, private masterService: MasterService,
              private notification: NotificationServiceService, private dialog: MatDialog,
              private commonLoader: LoaderService) { }

  ngOnInit() {
    this.getPlatformList();
    this.interviewerForm = this.fb.group({
      InterviewerName: ['', Validators.required],
      PlatformId: ['', Validators.required],
      Email: ['', Validators.required]
    });
    this.getInterviewerList();
  }

  addInterviewer(value) {
    if (!this.interviewerForm.valid) {
      this.notification.warning('Please fill required fields!');
      return;
    }
    this.commonLoader.showLoader();
    if (!this.isEdit) {
      const model: InterviewerModel = {
        Name: value.InterviewerName,
        Email: value.Email,
        PlatformId: value.PlatformId
       };
      this.masterService.addInterviewer(model).then(res => {
         this.notification.success('Added Successfully!');
      }).catch(err => {
        this.notification.error('Something went Wrong!');
      });
      this.interviewerForm.reset();
      this.getInterviewerList();
      this.commonLoader.hideLoader();
      // this.notification.success('Added Successfully!');
    } else {
      this.masterService.editInterviewer(document.getElementById('Id').innerText, value.InterviewerName, value.Email,
       value.PlatformId).then(res => {
         this.notification.success('Updated Successfully!');
         this.isEdit = false;
         this.interviewerForm.reset();
         this.commonLoader.hideLoader();
         this.getInterviewerList();
      }).catch(res => {
        this.notification.error('Something went wrong!');
        this.isEdit = false;
        this.interviewerForm.reset();
        this.commonLoader.hideLoader();
      });
    }
  }

  getInterviewerList() {
    this.masterService.getInterviewerList().subscribe(res => {
      this.interviewerList = [];
      res.docs.forEach(elem => {
        this.interviewer = {};
        this.interviewer.Id = elem.id;
        this.interviewer.InterviewerName = elem.data().Name;
        this.interviewer.PlatformId = elem.data().PlatformId;
        this.interviewer.Email = elem.data().Email;
        this.interviewer.PlatFormName = this.platformList.filter(x => x.Id === elem.data().PlatformId)[0].PlatformName;
        this.interviewerList.push(this.interviewer);
      });
    });
  }

  deleteEntry(Id) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '300px',
      height: '250px',
      data: {},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.data) {
        this.commonLoader.showLoader();
        this.masterService.deleteInterviwer(Id).then(res => {
          this.getInterviewerList();
          this.notification.success('Deleted Successfully!');
          this.commonLoader.hideLoader();
        }).catch(e => {
          this.notification.error('Something went wrong!');
        });
      }
    });
  }

  clearForm() {
    this.interviewerForm.reset();
    this.isEdit = false;
  }

  getPlatformList() {
    this.masterService.getPlatformList().pipe().subscribe(res => {
      this.platformList = [];
      res.docs.forEach(elem => {
        this.platform = {};
        this.platform.Id = elem.id;
        this.platform.PlatformName = elem.data().Name;
        this.platformList.push(this.platform);
      });
    });
  }

  editEntry(Id, interviewerName, platformId, email) {
    this.interviewerForm.controls['InterviewerName'].setValue(interviewerName);
    this.interviewerForm.controls['PlatformId'].setValue(platformId);
    this.interviewerForm.controls['Email'].setValue(email);
    this.isEdit = true;
    document.getElementById('Id').innerHTML = Id;
  }
}
