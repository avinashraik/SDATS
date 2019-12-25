import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtsRoutingModule } from './ats-routing.module';
import { AddCandidateComponent } from './components/add-candidate/add-candidate.component';
import {MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatChipsModule, MatRadioModule, MatAutocompleteModule, MatIconModule} from '@angular/material';
import { LandingComponent } from './components/landing/landing.component'
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddCandidateComponent, LandingComponent, DashboardComponent, ApplicationsComponent],
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
    SharedModule
  ],
  entryComponents:[AddCandidateComponent]
})
export class AtsModule { }
