import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCandidateComponent } from './components/add-candidate/add-candidate.component';
import { LandingComponent } from './components/landing/landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ApplicationsComponent } from './components/applications/applications.component';


const routes: Routes = [
  {path: '', component: LandingComponent ,children:[
    {path: '', component: DashboardComponent},
    {path: 'new-candidate', component: AddCandidateComponent},
    {path: 'applications', component: ApplicationsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtsRoutingModule { }
