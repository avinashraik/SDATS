import { Component, OnInit } from '@angular/core';
import { AtsService } from '../../service/ats.service';
import { schedule, Candidate } from '../../models/candidate';
import { MasterService } from 'src/app/master/service/master.service';

@Component({
  selector: 'app-all-schedules',
  templateUrl: './all-schedules.component.html',
  styleUrls: ['./all-schedules.component.scss']
})
export class AllSchedulesComponent implements OnInit {

  schedules: schedule[] = [];
  candidates: Candidate[] = [];
  interviewers: any[] = [];
  constructor(private ats: AtsService, private masterservice: MasterService) { }

  ngOnInit() {
    this.getAllCandidates();
    this.getAllInterviewers();
    this.getAllSchedules();
  }

  getAllSchedules() {
    this.ats.getAllSchedules().pipe().subscribe(res => {
      this.schedules = res.map(x => {
        const id = x.payload.doc.id;
        const schedule = x.payload.doc.data() as schedule;
        schedule.candName = this.candidates.find(x=>x.id == schedule.candidateId).name;
        schedule.InterviewerName = this.interviewers.find(x=>x.Id == schedule.interviewerId).InterviewerName ;
        // candidate.status = ApplicationStatus[Number(candidate.status)];
        schedule.id = id;
        return { ...schedule }
      })
    });
  }

  getAllInterviewers() {
    let name = '';
    this.masterservice.getInterviewerList().subscribe(res => {
      this.interviewers = [];
      res.docs.forEach(elem => {
        const interviewer: any = {}
        interviewer.Id = elem.id;
        interviewer.InterviewerName = elem.data().Name;
        interviewer.PlatformId = elem.data().PlatformId;
        interviewer.Email = elem.data().Email;
        this.interviewers.push(interviewer);
      });
    })
  }
  getAllCandidates() {
    this.ats.getCandidates().subscribe(res => {
      this.candidates = res.map(x => {
        const id = x.payload.doc.id;
        const candidate = x.payload.doc.data() as Candidate;
        // candidate.status = ApplicationStatus[Number(candidate.status)];
        candidate.id = id;
        return { ...candidate }
      })
    }, err => console.log(err))
  }

}
