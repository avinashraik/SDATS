import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCandidateComponent } from './components/add-candidate/add-candidate.component';


const routes: Routes = [
  {path: 'new-candidate', component: AddCandidateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtsRoutingModule { }
