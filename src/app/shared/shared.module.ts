import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { FileUploadService } from './components/services/file-upload.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';





@NgModule({
  declarations: [HeaderComponent, SideBarComponent],
  imports: [
    CommonModule,
    RouterModule

  ],
  exports: [HeaderComponent, SideBarComponent]
})
export class SharedModule { }
