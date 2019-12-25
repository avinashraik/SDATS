import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'ats', loadChildren: './ats/ats.module#AtsModule'},
  {path: 'master', loadChildren: './master/master.module#MasterModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
