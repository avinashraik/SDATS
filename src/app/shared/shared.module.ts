import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { FileUploadService } from './components/services/file-upload.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { DeleteComponent } from './components/delete/delete.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [HeaderComponent, SideBarComponent, DeleteComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule

  ],
  exports: [HeaderComponent, SideBarComponent],
  entryComponents: [
    DeleteComponent
  ]
})
export class SharedModule { }
