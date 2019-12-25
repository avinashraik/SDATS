
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUploadService } from 'src/app/shared/components/services/file-upload.service';
import { Upload } from 'src/app/shared/models/file-upload';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators'
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Candidate } from '../../models/candidate';
import { AtsService } from '../../service/ats.service';
import { NotificationServiceService } from 'src/app/core/services/notification-service.service';
import { MasterService } from 'src/app/master/service/master.service';
import { LoaderService } from 'src/app/shared/components/services/loader.service';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent implements OnInit {
  selectedFiles: FileList;
  currentUpload: Upload;
  candidateForm: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  selectedSkills: string[] = [];
  allFruits: string[] = [];
  candidate: Candidate = {};
  platform;
  platformList: any[] = [];
  source;
  sourcesList: any[] = [];
  recruiter;
  recruiterList: any[] = [];
  contactMode;
  contactModeList: any[] = [];
  // skill: SkillModel = {};
  skillsList: string[] = [];
  @ViewChild('fruitInput', { static: false }) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;


  constructor(private ups: FileUploadService, private authservice: AuthService,
              private fb: FormBuilder, private atsService: AtsService,
              private notification: NotificationServiceService, private masterService: MasterService,
              private commonLoader: LoaderService) {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.skillsList.slice()));

  }

  ngOnInit() {
    this.getPlatformList();
    this.getRecruiterList();
    this.getSourcesList();
    this.getContactModeList();
    this.getSkillsList();
    this.createForm();
  }
  createForm() {
    this.candidateForm = this.fb.group({
      name: ['', Validators.required],
      exp: ['', Validators.required],
      platform: ['', Validators.required],
      gender: ['', Validators.required],
      contactMode: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', Validators.required],
      source: ['', Validators.required],
      recruiter: ['', Validators.required],
      // skills: [''],
      status: ['1', Validators.required],
      description: [''],
    });
    this.candidateForm.valueChanges.subscribe(console.log);
  }
  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }
  uploadCv(event) {
    this.selectedFiles = event.target.files;
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    // this.ups.pushUpload(this.currentUpload)
  }
  addCandidate() {
    if (this.selectedSkills.length === 0) {
      this.notification.warning('Please select at least one Skill!');
      return;
    }
    if (this.currentUpload == null) {
      this.notification.warning('Please upload CV!');
      return;
    }
    this.commonLoader.showLoader();
    if (this.candidateForm.valid) {
      this.candidate = {};
      this.candidate.contactMode = this.candidateForm.controls.contactMode.value;
      this.candidate.contactNo = this.candidateForm.controls.contactNo.value;
      this.candidate.description = this.candidateForm.controls.description.value;
      this.candidate.email = this.candidateForm.controls.email.value;
      this.candidate.exp = this.candidateForm.controls.exp.value;
      this.candidate.gender = this.candidateForm.controls.gender.value;

      this.candidate.name = this.candidateForm.controls.name.value;
      this.candidate.platform = this.candidateForm.controls.platform.value;
      this.candidate.recruiter = this.candidateForm.controls.recruiter.value;
      this.candidate.skills = this.selectedSkills;
      this.candidate.source = this.candidateForm.controls.source.value;
      this.candidate.status = '1';
      this.candidate.CreatedDate = new Date();

      this.atsService.addCandidate(this.candidate).then(res => {
        this.currentUpload.name = res.id;
        const url = this.ups.pushUpload(this.currentUpload);
        this.candidate.CvUrl = url;
        this.atsService.editCandidate(res.id, this.candidate).then(r => {
          this.commonLoader.hideLoader();
          this.selectedFiles.item = null;
        });
        this.candidateForm.reset();
        this.notification.success('Candidate Added!');

      })
      // this.currentUpload.name = "Test";
      // this.ups.pushUpload(this.currentUpload)
      // console.log(this.candidate);
    }
  }
  // Mat Chips integration

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.selectedSkills.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.skillCtrl.setValue(null);
    }
  }
  remove(skill: string): void {
    const index = this.selectedSkills.indexOf(skill);

    if (index >= 0) {
      this.selectedSkills.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedSkills.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.skillsList.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
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

  getSkillsList() {
    this.masterService.getSkillsList().pipe().subscribe(res => {
      this.skillsList = [];
      res.docs.forEach(elem => {
        // this.skill = {};
        // this.skill.SkillId = elem.id;
        // this.skill.SkillName = elem.data().Name;
        this.skillsList.push(elem.data().Name);
      });
    });
  }
}

export class SkillModel {
  SkillId?;
  SkillName?;
}
