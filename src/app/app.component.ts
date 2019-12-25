import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SDATS';
  isLoginUrl = false;
  constructor(private route: Router) {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/auth/login') {
          this.isLoginUrl = true;
        } else { this.isLoginUrl = false; }
      }
    });
    
  }
}
