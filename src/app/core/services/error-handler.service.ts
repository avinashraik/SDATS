import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { StatusCode } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor() {
  }

  handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case StatusCode.BadRequest:

        break;
      case StatusCode.Created:
        break;
      case StatusCode.Forbidden:
        break;
      case StatusCode.InteralServerError:
        break;
      case StatusCode.NotFound:
        break;
      case StatusCode.Ok:
        break;
      case StatusCode.Unauthorized:
        break;

      default:
        break;
    }

  }
}
