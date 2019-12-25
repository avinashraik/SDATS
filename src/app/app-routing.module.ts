import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLanding = redirectUnauthorizedTo(['/auth/login']);
const redirectLoggedInToLanding = redirectLoggedInTo(['/']);

const routes: Routes = [
  { path:'', redirectTo:'ats', pathMatch:'full'},
  { path: 'ats', loadChildren: './ats/ats.module#AtsModule', ...canActivate(redirectUnauthorizedToLanding) },
  { path: 'master', loadChildren: './master/master.module#MasterModule', ...canActivate(redirectUnauthorizedToLanding) },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule',...canActivate(redirectLoggedInToLanding) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
