
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
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  candidate: Candidate = {};

  @ViewChild('fruitInput', { static: false }) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;


  constructor(private ups: FileUploadService, private authservice: AuthService,
    private fb: FormBuilder, private atsService: AtsService, private notification: NotificationServiceService) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));

  }

  ngOnInit() {
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
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    // this.ups.pushUpload(this.currentUpload)
  }
  addCandidate() {
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
      this.candidate.skills = this.fruits;
      this.candidate.source = this.candidateForm.controls.source.value;
      this.candidate.status = '1'

      this.atsService.addCandidate(this.candidate).then(res => {
        this.currentUpload.name = res.id
        this.ups.pushUpload(this.currentUpload)
        this.notification.success("Candidate Added");

      })
      // this.currentUpload.name = "Test";
      this.ups.pushUpload(this.currentUpload)
      console.log(this.candidate);
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
        this.fruits.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }
  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}
