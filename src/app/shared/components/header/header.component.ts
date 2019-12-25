import { Component, OnInit } from '@angular/core';
import { AtsService } from 'src/app/ats/service/ats.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  logout(){
    this.auth.logout();
  }
}
