import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { NotificationServiceService } from 'src/app/core/services/notification-service.service';
import { MatDialog } from '@angular/material';
import { LoaderService } from 'src/app/shared/components/services/loader.service';
import { CommonMasterModel } from '../../Models/configuration-model';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  isEdit = false;
  skillsForm: FormGroup;
  skill;
  skillsList: any[] = [];
  constructor(private fb: FormBuilder, private masterService: MasterService,
              private notification: NotificationServiceService, private dialog: MatDialog,
              private commonLoader: LoaderService) { }

  ngOnInit() {
    this.skillsForm = this.fb.group({
      SkillName: ['', Validators.required]
    });
    this.getSkillsList();
  }

  addSkills(value) {
    if (!this.skillsForm.valid) {
      this.notification.warning('Please fill required fields!');
      return;
    }
    this.commonLoader.showLoader();
    if (!this.isEdit) {
      const splittedArray = value.SkillName.split(',');
      splittedArray.forEach(element => {
      const model: CommonMasterModel = {
        Name: element
      };
      this.masterService.addSkill(model).then(res => {
        // this.notification.success('Added Successfully!');
      }).catch();
    });
      this.skillsForm.reset();
      this.getSkillsList();
      this.commonLoader.hideLoader();
      this.notification.success('Added Successfully!');
    } else {
      const splittedArray = value.SkillName.split(',');
      if (splittedArray.length !== 1) {
        this.notification.warning('Value cannot contain comma in Edit Mode!');
        this.commonLoader.hideLoader();
        return;
      }
      this.masterService.editSkill(document.getElementById('Id').innerText, splittedArray[0]).then(res => {
         this.notification.success('Updated Successfully!');
         this.isEdit = false;
         this.skillsForm.reset();
         this.commonLoader.hideLoader();
         this.getSkillsList();
      }).catch(res => {
        this.notification.error('Something went wrong!');
        this.isEdit = false;
        this.skillsForm.reset();
        this.commonLoader.hideLoader();
      });
    }
  }

  getSkillsList() {
    this.masterService.getSkillsList().pipe().subscribe(res => {
      this.skillsList = [];
      res.docs.forEach(elem => {
        this.skill = {};
        this.skill.Id = elem.id;
        this.skill.SkillName = elem.data().Name;
        this.skillsList.push(this.skill);
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
        this.masterService.deleteSkill(Id).then(res => {
          this.getSkillsList();
          this.notification.success('Deleted Successfully!');
          this.commonLoader.hideLoader();
        }).catch(e => {
          this.notification.error('Something went wrong!');
        });
      }
    });
  }

  clearForm() {
    this.skillsForm.reset();
    this.isEdit = false;
  }

  editEntry(Id, skillName) {
    this.skillsForm.controls['SkillName'].setValue(skillName);
    this.isEdit = true;
    document.getElementById('Id').innerHTML = Id;
  }
}
