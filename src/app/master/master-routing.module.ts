import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { LandingComponent } from './components/landing/landing.component';


const routes: Routes = [
  {
    path: '', component: LandingComponent, children: [
      { path: 'configuration', component: ConfigurationComponent, }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
