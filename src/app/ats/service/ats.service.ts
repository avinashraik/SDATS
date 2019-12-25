import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Candidate, schedule } from '../models/candidate';
import { API_URL } from 'src/app/shared/constants/constant';

@Injectable({
  providedIn: 'root'
})
export class AtsService {

  constructor(private db: AngularFirestore) { }

  addCandidate(data: Candidate) {
    // return this.db.collection('SDATS').doc('configuration').collection('platform').add(data);
    return this.db.collection(API_URL.Application).add(data);
  }
  getCandidates() {
    return this.db.collection(API_URL.Application).snapshotChanges();
  }
  updateStatus(id, value) {
    return this.db.collection(API_URL.Application).doc(id).set(value);
  }
  scheduleInterview(data: schedule) {
    return this.db.collection(API_URL.Schedule).add(data);
  }
  getAllSchedules(){
    return this.db.collection(API_URL.Schedule).snapshotChanges();
  }
}
