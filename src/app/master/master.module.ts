import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { MatTabsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { InterviewersComponent } from './components/interviewers/interviewers.component';
import { PlatformComponent } from './components/platform/platform.component';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactModeComponent } from './components/contact-mode/contact-mode.component';
import { SourceComponent } from './components/source/source.component';
import { RecruiterComponent } from './components/recruiter/recruiter.component';
import { LandingComponent } from './components/landing/landing.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ConfigurationComponent, InterviewersComponent, PlatformComponent, LandingComponent,
    SkillsComponent, ContactModeComponent, SourceComponent,
    RecruiterComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    MatSelectModule,
    SharedModule
  ]
})
export class MasterModule { }
