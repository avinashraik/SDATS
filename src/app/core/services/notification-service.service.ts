import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  constructor(private toastr: ToastrService) {
  }

  success(title?: string, message?: string) {
    this.toastr.success(message, title);
  }

  warning(title?: string, message?: string) {
    this.toastr.warning(message, title);
  }

  error(title?: string, message?: string) {
    this.toastr.error(message, title);
  }
}
