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

  constructor(private fn: AngularFireFunctions, private notification: NotificationServiceService
    , private http: HttpClient, private db: AngularFirestore) { }
  sendScheduleMail(candidatedetail: Candidate, interviewerDetail, sch: schedule) {

    let email: EmailBody = {};
    email.subject = "Interview Scheduled";
    email.content = `<p>Hello <b>${interviewerDetail.InterviewerName}</b><br/>
     <b> Candidate Name: </b> ${candidatedetail.name} <br/>
     <b> Experience: </b> ${candidatedetail.exp}  <br/>
     <b> Date: </b> ${sch.scheduleDate}  <br/>
     <b> Time: </b> ${sch.scheduleTime}' <br/>
     Thanks
    </p>`;
    this.http.post('https://us-central1-sdats-83300.cloudfunctions.net/sendMail?dest=' + interviewerDetail.Email, email).subscribe(res => {
      this.notification.success("Email Sended")
    })
    // const mail = this.fn.functions.httpsCallable('sendMail?dest=' + intervieweremail);
    // mail().then().catch(err => {
    // });
  }

  sendFeedback(data: Feedback) {
    return this.db.collection(API_URL.Feedback).add(data)
  }
}
