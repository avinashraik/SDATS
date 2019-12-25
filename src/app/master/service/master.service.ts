import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommonMasterModel, InterviewerModel } from '../Models/configuration-model';
import { API_URL } from 'src/app/shared/constants/constant';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private db: AngularFirestore) { }

  addPlatform(data: CommonMasterModel) {
    // return this.db.collection('SDATS').doc('configuration').collection('platform').add(data);
    return this.db.collection(API_URL.Platform).add(data);
  }

  getPlatformList() {
    return this.db.collection(API_URL.Platform).get();
  }

  deletePlatform(id) {
    return this.db.collection(API_URL.Platform).doc(id).delete();
  }

  editPlatform(id, name) {
    const value = {
      Name: name
    };
    return this.db.collection(API_URL.Platform).doc(id).set(value);
  }

  addInterviewer(data: InterviewerModel) {
    // return this.db.collection('SDATS').doc('configuration').collection('platform').add(data);
    return this.db.collection(API_URL.Interviewer).add(data);
  }

  getInterviewerList() {
    return this.db.collection(API_URL.Interviewer).get();
  }
  getInterviewerById(id) {
    return this.db.collection(API_URL.Interviewer).doc(id).ref.get();
  }

  editInterviewer(id, name, email, platformId) {
    const value = {
      Name: name,
      Email: email,
      PlatformId: platformId
    };
    return this.db.collection(API_URL.Interviewer).doc(id).set(value);
  }

  deleteInterviwer(id) {
    return this.db.collection(API_URL.Interviewer).doc(id).delete();
  }

  addSkill(data: CommonMasterModel) {
    return this.db.collection(API_URL.Skill).add(data);
  }

  editSkill(id, name) {
    const value = {
      Name: name
    };
    return this.db.collection(API_URL.Skill).doc(id).set(value);
  }

  getSkillsList() {
    return this.db.collection(API_URL.Skill).get();
  }

  deleteSkill(id) {
    return this.db.collection(API_URL.Skill).doc(id).delete();
  }

  deleteContactMode(id) {
    return this.db.collection(API_URL.ContactMode).doc(id).delete();
  }

  addContactMode(data: CommonMasterModel) {
    return this.db.collection(API_URL.ContactMode).add(data);
  }

  editContactMode(id, name) {
    const value = {
      Name: name
    };
    return this.db.collection(API_URL.ContactMode).doc(id).set(value);
  }

  getContactModeList() {
    return this.db.collection(API_URL.ContactMode).get();
  }

  deleteSource(id) {
    return this.db.collection(API_URL.Source).doc(id).delete();
  }

  addSource(data: CommonMasterModel) {
    return this.db.collection(API_URL.Source).add(data);
  }

  editSource(id, name) {
    const value = {
      Name: name
    };
    return this.db.collection(API_URL.Source).doc(id).set(value);
  }

  getSourcesList() {
    return this.db.collection(API_URL.Source).get();
  }

  deleteRecruiter(id) {
    return this.db.collection(API_URL.Recruiter).doc(id).delete();
  }

  addRecruiter(data: CommonMasterModel) {
    return this.db.collection(API_URL.Recruiter).add(data);
  }

  editRecruiter(id, name) {
    const value = {
      Name: name
    };
    return this.db.collection(API_URL.Recruiter).doc(id).set(value);
  }

  getRecruiterList() {
    return this.db.collection(API_URL.Recruiter).get();
  }
}
