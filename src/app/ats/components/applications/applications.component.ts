import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddCandidateComponent } from '../add-candidate/add-candidate.component';
import { AtsService } from '../../service/ats.service';
import { Candidate } from '../../models/candidate';
import { ApplicationStatus } from 'src/app/shared/constants/constant';
import { NotificationServiceService } from 'src/app/core/services/notification-service.service';
import { ScheduleInterviewComponent } from '../schedule-interview/schedule-interview.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit, OnDestroy {

  candidates: Candidate[] = [];
  candidate: Candidate = {};
  get applicationStatus() { return ApplicationStatus; }
  constructor(private dialog: MatDialog, private atsService: AtsService, private notification: NotificationServiceService) { }

  ngOnInit() {
    this.candidates = [];
    this.getAllCandidates();
  }
  getAllCandidates() {
    this.atsService.getCandidates().subscribe(res => {
      this.candidates = res.map(x => {
        const id = x.payload.doc.id;
        const candidate = x.payload.doc.data() as Candidate;
        // candidate.status = ApplicationStatus[Number(candidate.status)];
        candidate.id = id;
        return { ...candidate }
      })
    }, err => console.log(err))
  }
  addCandidate() {
    const dg = this.dialog.open(AddCandidateComponent,
      {
        width: '500px',
        // height: '500px'
      }
    ).afterClosed().subscribe(res => {
      console.log(res);
    })

  }
  statusUpdate(id, status) {
    const candidate = this.candidates.find(x => x.id == id);
    candidate.status = String(status);
    this.atsService.updateStatus(id, candidate).then(res => {
      this.notification.success('Status updated');
    }).catch(err => {
      this.notification.success('Something went wrong');
    })
  }

  scheduleInterview(id) {
    const candidate = this.candidates.find(x => x.id == id);
    const dg = this.dialog.open(ScheduleInterviewComponent,
      {
        width: '500px',
        data: candidate
      }
    ).afterClosed().subscribe(res => {
  
    })

  }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

}
