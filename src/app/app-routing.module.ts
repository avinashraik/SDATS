import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLanding = redirectUnauthorizedTo(['/auth/login']);

const routes: Routes = [
  { path: 'ats', loadChildren: './ats/ats.module#AtsModule', ...canActivate(redirectUnauthorizedToLanding) },
  { path: 'master', loadChildren: './master/master.module#MasterModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
