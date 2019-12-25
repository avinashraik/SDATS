import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AtsRoutingModule } from './ats-routing.module';
import { AddCandidateComponent } from './components/add-candidate/add-candidate.component';
import {MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatChipsModule, MatRadioModule, MatAutocompleteModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule} from '@angular/material';
import { LandingComponent } from './components/landing/landing.component'
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleInterviewComponent } from './components/schedule-interview/schedule-interview.component';
import { TimepickerModule } from 'ngx-bootstrap';
import { AllSchedulesComponent } from './components/all-schedules/all-schedules.component';


@NgModule({
  declarations: [AddCandidateComponent, LandingComponent, DashboardComponent, ApplicationsComponent, ScheduleInterviewComponent, 
    AllSchedulesComponent],
  imports: [
    CommonModule,
    AtsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatChipsModule,
    MatRadioModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    TimepickerModule.forRoot(),
  
    SharedModule
  ],
  entryComponents:[AddCandidateComponent, ScheduleInterviewComponent]
})
export class AtsModule { }
