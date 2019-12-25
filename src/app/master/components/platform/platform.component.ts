import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatformModel } from '../../Models/configuration-model';
import { MasterService } from '../../service/master.service';
import { NotificationServiceService } from 'src/app/core/services/notification-service.service';
import { MatDialog } from '@angular/material';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { LoaderService } from 'src/app/shared/components/services/loader.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {

  platformForm: FormGroup;
  platform;
  platformList: any[] = [];
  constructor(private fb: FormBuilder, private masterService: MasterService,
              private notification: NotificationServiceService, private dialog: MatDialog,
              private commonLoader: LoaderService) { }

  ngOnInit() {
    this.platformForm = this.fb.group({
      PlatFormName: ['', Validators.required]
    });
    this.getPlatformList();
  }

  addPlatform(value) {
    if (!this.platformForm.valid) {
      this.notification.warning('Please fill required fields!');
      return;
    }
    this.commonLoader.showLoader();
    const splittedArray = value.PlatFormName.split(',');
    splittedArray.forEach(element => {
      const model: PlatformModel = {
        Name: element
      };
      this.masterService.addPlatform(model).then(res => {
        // this.notification.success('Added Successfully!');
      }).catch();
    });
    this.platformForm.reset();
    this.getPlatformList();
    this.commonLoader.hideLoader();
    this.notification.success('Added Successfully!');
  }

  getPlatformList() {
    this.masterService.getPlatformList().pipe().subscribe(res => {
      this.platformList = [];
      res.docs.forEach(elem => {
        this.platform = {};
        this.platform.Id = elem.id;
        this.platform.PlatformName = elem.data().Name;
        this.platformList.push(this.platform);
      });
    });
  }

  deleteEntry(Id) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '300px',
      height: '250px',
      data: {},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.data) {
        this.commonLoader.showLoader();
        this.masterService.deletePlatform(Id).then(res => {
          this.getPlatformList();
          this.notification.success('Deleted Successfully!');
          this.commonLoader.hideLoader();
        }).catch(e => {
          this.notification.error('Something went wrong!');
        });
      }
    });
  }

  editEntry(Id, Name) {

  }
}


