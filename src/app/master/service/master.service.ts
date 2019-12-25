import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PlatformModel } from '../Models/configuration-model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private db: AngularFirestore) { }

  addPlatform(data: PlatformModel) {
    // return this.db.collection('SDATS').doc('configuration').collection('platform').add(data);
    return this.db.collection('SDATS/configuration/platform').add(data);
  }

  getPlatformList() {
    return this.db.collection('SDATS').doc('configuration').collection('platform').get();
  }

  deletePlatform(id) {
    return this.db.collection('SDATS/configuration/platform/').doc(id).delete();
  }
}
