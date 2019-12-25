import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NotificationServiceService } from 'src/app/core/services/notification-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth : AngularFireAuth , private route:Router, private notification: NotificationServiceService) { }

  login(email,password) {
    this.auth.auth.signInWithEmailAndPassword(email, password).then(res => {
      this.auth.auth.currentUser.getIdToken().then(token => {
        localStorage.setItem("token", token);
        this.route.navigate(['/']);

      })
    }).catch(err=>{
      this.notification.error("","Invalid Credentials")
    });
  }
  logout() {
    this.auth.auth.signOut().then(() => {
      localStorage.removeItem('token');
      this.route.navigate(['/auth/login']);
    })
  }
}
