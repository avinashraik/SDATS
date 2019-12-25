import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtsRoutingModule } from './ats-routing.module';
import { AddCandidateComponent } from './components/add-candidate/add-candidate.component';


@NgModule({
  declarations: [AddCandidateComponent],
  imports: [
    CommonModule,
    AtsRoutingModule
  ]
})
export class AtsModule { }
