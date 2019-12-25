import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PlatformModel } from '../Models/configuration-model';
import { API_URL } from 'src/app/shared/constants/constant';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private db: AngularFirestore) { }

  addPlatform(data: PlatformModel) {
    // return this.db.collection('SDATS').doc('configuration').collection('platform').add(data);
    return this.db.collection(API_URL.Platform).add(data);
  }

  getPlatformList() {
    return this.db.collection(API_URL.Platform).get();
  }

  deletePlatform(id) {
    return this.db.collection(API_URL.Platform).doc(id).delete();
  }
}
