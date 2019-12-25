import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from '../../models/feedback';
import { AtsService } from 'src/app/ats/service/ats.service';
import { EmailService } from '../services/email.service';
import { NotificationServiceService } from 'src/app/core/services/notification-service.service';

@Component({
  selector: 'app-feeback',
  templateUrl: './feeback.component.html',
  styleUrls: ['./feeback.component.scss']
})
export class FeebackComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback = {};
  scheduleId = '';
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private ats: AtsService, private emailservice: EmailService, private notification: NotificationServiceService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => console.log(this.scheduleId = params.get('id')));
    this.createForm();

  }
  createForm() {
    this.feedbackForm = this.fb.group({
      status: ['', Validators.required],
      feedback: ['', Validators.required]
    })
  }

  submitFeedback() {
    if (this.feedbackForm.valid) {
      this.ats.getSchedule(this.scheduleId).subscribe(res => {
        this.feedback.status = this.feedbackForm.controls.status.value;
        this.feedback.feedback = this.feedbackForm.controls.feedback.value;
        this.feedback.candidateId = res.data().candidateId;
        this.feedback.interviewerId = res.data().interviewerId;
        this.emailservice.sendFeedback(this.feedback).then(res => {
          this.notification.success("Feedback Submitted");
          this.feedbackForm.reset();
        })
      })

    }
  }

}
