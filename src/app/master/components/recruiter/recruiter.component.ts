import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { NotificationServiceService } from 'src/app/core/services/notification-service.service';
import { MatDialog } from '@angular/material';
import { LoaderService } from 'src/app/shared/components/services/loader.service';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { CommonMasterModel } from '../../Models/configuration-model';

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.scss']
})
export class RecruiterComponent implements OnInit {
  isEdit = false;
  recruiterForm: FormGroup;
  recruiter;
  recruiterList: any[] = [];
  constructor(private fb: FormBuilder, private masterService: MasterService,
              private notification: NotificationServiceService, private dialog: MatDialog,
              private commonLoader: LoaderService) { }

  ngOnInit() {
    this.recruiterForm = this.fb.group({
      RecruiterName: ['', Validators.required]
    });
    this.getRecruiterList();
  }

  addRecruiter(value) {
    if (!this.recruiterForm.valid) {
      this.notification.warning('Please fill required fields!');
      return;
    }
    this.commonLoader.showLoader();
    if (!this.isEdit) {
      const splittedArray = value.RecruiterName.split(',');
      splittedArray.forEach(element => {
      const model: CommonMasterModel = {
        Name: element
      };
      this.masterService.addRecruiter(model).then(res => {
        // this.notification.success('Added Successfully!');
      }).catch();
    });
      this.recruiterForm.reset();
      this.getRecruiterList();
      this.commonLoader.hideLoader();
      this.notification.success('Added Successfully!');
    } else {
      const splittedArray = value.RecruiterName.split(',');
      if (splittedArray.length !== 1) {
        this.notification.warning('Value cannot contain comma in Edit Mode!');
        this.commonLoader.hideLoader();
        return;
      }
      this.masterService.editRecruiter(document.getElementById('Id').innerText, splittedArray[0]).then(res => {
         this.notification.success('Updated Successfully!');
         this.isEdit = false;
         this.recruiterForm.reset();
         this.commonLoader.hideLoader();
         this.getRecruiterList();
      }).catch(res => {
        this.notification.error('Something went wrong!');
        this.isEdit = false;
        this.recruiterForm.reset();
        this.commonLoader.hideLoader();
      });
    }
  }

  getRecruiterList() {
    this.masterService.getRecruiterList().pipe().subscribe(res => {
      this.recruiterList = [];
      res.docs.forEach(elem => {
        this.recruiter = {};
        this.recruiter.Id = elem.id;
        this.recruiter.RecruiterName = elem.data().Name;
        this.recruiterList.push(this.recruiter);
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
        this.masterService.deleteRecruiter(Id).then(res => {
          this.getRecruiterList();
          this.notification.success('Deleted Successfully!');
          this.commonLoader.hideLoader();
        }).catch(e => {
          this.notification.error('Something went wrong!');
        });
      }
    });
  }

  clearForm() {
    this.recruiterForm.reset();
    this.isEdit = false;
  }

  editEntry(Id, recruiterName) {
    this.recruiterForm.controls['RecruiterName'].setValue(recruiterName);
    this.isEdit = true;
    document.getElementById('Id').innerHTML = Id;
  }
}
