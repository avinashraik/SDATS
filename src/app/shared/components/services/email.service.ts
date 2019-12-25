import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { NotificationServiceService } from 'src/app/core/services/notification-service.service';
import { Candidate, schedule } from 'src/app/ats/models/candidate';
import { HttpClient } from '@angular/common/http';
import { EmailBody } from '../../models/email';
import { Feedback } from '../../models/feedback';
import { AngularFirestore } from '@angular/fire/firestore';
import { API_URL } from '../../constants/constant';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private fn: AngularFireFunctions, private notification: NotificationServiceService, private http: HttpClient,
    private db: AngularFirestore) { }
  sendScheduleMail(candidatedetail: Candidate, interviewerDetail, sch: schedule) {

    const InterviewerEmail: EmailBody = {};
    const CandidateEmail: EmailBody = {};
    InterviewerEmail.subject = 'Interview Scheduled';
    CandidateEmail.subject = 'Interview Scheduled for Recruitment in smartData Enterprises Inc.';
    InterviewerEmail.content = `<p>Hello, <b>${interviewerDetail.InterviewerName}</b><br/>
    <p>Please find below the details of Candidate to Interview:</p>
    <table style="width:100%;font-size:12px;" border="1" bordercolor="#bfbfbf" cellspacing="0">
      <tr>
        <th align="left">Candidate Name</th>
        <td>${candidatedetail.name}</td>
      </tr>
      <tr>
        <th align="left">Experience</th>
        <td> ${candidatedetail.exp} Years</td>
      </tr>
      <tr>
        <th align="left">Date</th>
        <td>${sch.scheduleDate}</td>
      </tr>
      <tr>
        <th align="left">Time</th>
        <td>${new Date(sch.scheduleTime).toLocaleTimeString('en-IN')}</td>
      </tr>
    </table>
    <p>Please find Candidate's CV <a href="${candidatedetail.CvUrl}">here</a>.</p><br/>
    <p>Kindly ensure filling <a href='https://${window.location.host}/feedback/${sch.interviewerId}'>this feedback</a>
    form after Interview is done and leave your feedback there.</p><br/>
     Thanks, <br/>
    <b>HR Department</b><br/>
    <b>smartData Enterprises Inc.</b>
    </p>`;
    CandidateEmail.content = `<p>Hello, <b>${candidatedetail.name}</b><br/>
    <p>You have an Interview Scheduled for your Recruitment in smartData Enterprises Inc.</p></br>
    <p>Please find below the details and be available at given time for Interview.</p>
    <table style="width:100%;font-size:12px;" border="1" bordercolor="#bfbfbf" cellspacing="0">
      <tr>
        <th align="left">Interviewer Name</th>
        <td>${interviewerDetail.InterviewerName}</td>
      </tr>
      <tr>
        <th align="left">Date</th>
        <td>${sch.scheduleDate}</td>
      </tr>
      <tr>
        <th align="left">Time</th>
        <td>${new Date(sch.scheduleTime).toLocaleTimeString('en-IN')}</td>
      </tr>
    </table>
    <p>Best Wishes!</p><br/>
     Regards, <br/>
    <b>HR Department</b><br/>
    <b>smartData Enterprises Inc.</b>
    </p>`;
    this.http.post('https://us-central1-sdats-83300.cloudfunctions.net/sendMail?dest=' + interviewerDetail.Email, InterviewerEmail)
      .subscribe(res => {
        this.notification.success('Email Sent to Interviewer!');
      });
    this.http.post('https://us-central1-sdats-83300.cloudfunctions.net/sendMail?dest=' + candidatedetail.email, CandidateEmail)
      .subscribe(res => {
        this.notification.success('Email Sent to Candidate!');
      });
  }

  sendFeedback(data: Feedback) {
    return this.db.collection(API_URL.Feedback).add(data)
  }
}
