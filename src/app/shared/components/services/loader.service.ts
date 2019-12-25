import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  showLoader() {
    document.getElementById('loader').style.display = 'block';
  }

  hideLoader() {
    document.getElementById('loader').style.display = 'none';
  }
}
