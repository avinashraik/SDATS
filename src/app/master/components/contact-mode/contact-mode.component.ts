import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { NotificationServiceService } from 'src/app/core/services/notification-service.service';
import { MatDialog } from '@angular/material';
import { LoaderService } from 'src/app/shared/components/services/loader.service';
import { CommonMasterModel } from '../../Models/configuration-model';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';

@Component({
  selector: 'app-contact-mode',
  templateUrl: './contact-mode.component.html',
  styleUrls: ['./contact-mode.component.scss']
})
export class ContactModeComponent implements OnInit {
  isEdit = false;
  contactModeForm: FormGroup;
  contactMode;
  contactModeList: any[] = [];
  constructor(private fb: FormBuilder, private masterService: MasterService,
              private notification: NotificationServiceService, private dialog: MatDialog,
              private commonLoader: LoaderService) { }

  ngOnInit() {
    this.contactModeForm = this.fb.group({
      ContactModeName: ['', Validators.required]
    });
    this.getContactModeList();
  }

  addContactMode(value) {
    if (!this.contactModeForm.valid) {
      this.notification.warning('Please fill required fields!');
      return;
    }
    this.commonLoader.showLoader();
    if (!this.isEdit) {
      const splittedArray = value.ContactModeName.split(',');
      splittedArray.forEach(element => {
      const model: CommonMasterModel = {
        Name: element
      };
      this.masterService.addContactMode(model).then(res => {
        // this.notification.success('Added Successfully!');
      }).catch();
    });
      this.contactModeForm.reset();
      this.getContactModeList();
      this.commonLoader.hideLoader();
      this.notification.success('Added Successfully!');
    } else {
      const splittedArray = value.ContactModeName.split(',');
      if (splittedArray.length !== 1) {
        this.notification.warning('Value cannot contain comma in Edit Mode!');
        this.commonLoader.hideLoader();
        return;
      }
      this.masterService.editContactMode(document.getElementById('Id').innerText, splittedArray[0]).then(res => {
         this.notification.success('Updated Successfully!');
         this.isEdit = false;
         this.contactModeForm.reset();
         this.commonLoader.hideLoader();
         this.getContactModeList();
      }).catch(res => {
        this.notification.error('Something went wrong!');
        this.isEdit = false;
        this.contactModeForm.reset();
        this.commonLoader.hideLoader();
      });
    }
  }

  getContactModeList() {
    this.masterService.getContactModeList().pipe().subscribe(res => {
      this.contactModeList = [];
      res.docs.forEach(elem => {
        this.contactMode = {};
        this.contactMode.Id = elem.id;
        this.contactMode.ContactModeName = elem.data().Name;
        this.contactModeList.push(this.contactMode);
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
        this.masterService.deleteContactMode(Id).then(res => {
          this.getContactModeList();
          this.notification.success('Deleted Successfully!');
          this.commonLoader.hideLoader();
        }).catch(e => {
          this.notification.error('Something went wrong!');
        });
      }
    });
  }

  clearForm() {
    this.contactModeForm.reset();
    this.isEdit = false;
  }

  editEntry(Id, contactModeName) {
    this.contactModeForm.controls['ContactModeName'].setValue(contactModeName);
    this.isEdit = true;
    document.getElementById('Id').innerHTML = Id;
  }
}
