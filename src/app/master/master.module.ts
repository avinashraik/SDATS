import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { MatTabsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { InterviewersComponent } from './components/interviewers/interviewers.component';
import { PlatformComponent } from './components/platform/platform.component';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [ConfigurationComponent, InterviewersComponent, PlatformComponent],
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
    CoreModule
  ]
})
export class MasterModule { }
