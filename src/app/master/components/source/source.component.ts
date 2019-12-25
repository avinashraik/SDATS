import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { NotificationServiceService } from 'src/app/core/services/notification-service.service';
import { MatDialog } from '@angular/material';
import { LoaderService } from 'src/app/shared/components/services/loader.service';
import { CommonMasterModel } from '../../Models/configuration-model';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {
  isEdit = false;
  sourceForm: FormGroup;
  source;
  sourcesList: any[] = [];
  constructor(private fb: FormBuilder, private masterService: MasterService,
              private notification: NotificationServiceService, private dialog: MatDialog,
              private commonLoader: LoaderService) { }

  ngOnInit() {
    this.sourceForm = this.fb.group({
      SourceName: ['', Validators.required]
    });
    this.getSourcesList();
  }

  addSource(value) {
    if (!this.sourceForm.valid) {
      this.notification.warning('Please fill required fields!');
      return;
    }
    this.commonLoader.showLoader();
    if (!this.isEdit) {
      const splittedArray = value.SourceName.split(',');
      splittedArray.forEach(element => {
      const model: CommonMasterModel = {
        Name: element
      };
      this.masterService.addSource(model).then(res => {
        // this.notification.success('Added Successfully!');
      }).catch();
    });
      this.sourceForm.reset();
      this.getSourcesList();
      this.commonLoader.hideLoader();
      this.notification.success('Added Successfully!');
    } else {
      const splittedArray = value.SourceName.split(',');
      if (splittedArray.length !== 1) {
        this.notification.warning('Value cannot contain comma in Edit Mode!');
        this.commonLoader.hideLoader();
        return;
      }
      this.masterService.editSource(document.getElementById('Id').innerText, splittedArray[0]).then(res => {
         this.notification.success('Updated Successfully!');
         this.isEdit = false;
         this.sourceForm.reset();
         this.commonLoader.hideLoader();
         this.getSourcesList();
      }).catch(res => {
        this.notification.error('Something went wrong!');
        this.isEdit = false;
        this.sourceForm.reset();
        this.commonLoader.hideLoader();
      });
    }
  }

  getSourcesList() {
    this.masterService.getSourcesList().pipe().subscribe(res => {
      this.sourcesList = [];
      res.docs.forEach(elem => {
        this.source = {};
        this.source.Id = elem.id;
        this.source.SourceName = elem.data().Name;
        this.sourcesList.push(this.source);
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
        this.masterService.deleteSource(Id).then(res => {
          this.getSourcesList();
          this.notification.success('Deleted Successfully!');
          this.commonLoader.hideLoader();
        }).catch(e => {
          this.notification.error('Something went wrong!');
        });
      }
    });
  }

  clearForm() {
    this.sourceForm.reset();
    this.isEdit = false;
  }

  editEntry(Id, sourceName) {
    this.sourceForm.controls['SourceName'].setValue(sourceName);
    this.isEdit = true;
    document.getElementById('Id').innerHTML = Id;
  }
}

