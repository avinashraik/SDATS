import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthService, private route: Router) { }
  loginForm: FormGroup;
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['sd_hr@smartdatainc.net', Validators.required],
      password: ['sdei#2019', Validators.required]
    });
  }
  login(e) {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
    }
  }
  logout() {
    this.auth.logout();
  }
}
