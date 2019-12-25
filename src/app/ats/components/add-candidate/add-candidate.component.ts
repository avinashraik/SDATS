import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/shared/components/services/file-upload.service';
import { Upload } from 'src/app/shared/models/file-upload';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent implements OnInit {

  constructor(private ups: FileUploadService, private authservice: AuthService) { }
  selectedFiles: FileList;
  currentUpload: Upload;
  ngOnInit() {
  }
  detectFiles(event){
    this.selectedFiles = event.target.files;
    this.uploadSingle();
  }
  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.ups.pushUpload(this.currentUpload)
  }
  logout(){
    this.authservice.logout();
  }
}
