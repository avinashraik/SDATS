import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireStorageModule} from '@angular/fire/storage';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireAuthGuardModule} from '@angular/fire/auth-guard';
import { AngularFireFunctionsModule} from '@angular/fire/functions';
import { environment } from 'src/environments/environment';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    CoreModule,
    MatProgressSpinnerModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireFunctionsModule,
    AuthModule,
    CoreModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
