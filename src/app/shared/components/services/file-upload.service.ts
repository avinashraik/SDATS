import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Upload } from '../../models/file-upload';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePath: string = '/uploads';
  uploads: Observable<Upload[]>;
  constructor(private db: AngularFirestore, private storage: AngularFireStorage) { }
  pushUpload(upload: Upload) {
    let storageRef = this.storage.ref(`${this.basePath}/${upload.file.name}`)
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);



    this.storage.upload(`${this.basePath}/${upload.file.name}`, upload.file).then(res => {
      upload.url = uploadTask.snapshot.downloadURL
      upload.name = upload.file.name
      console.log('uploaded');
    }).catch(err => {
      console.log(err);
    })

    // uploadTask.on(this.storage.TaskEvent.STATE_CHANGED,
    //   (snapshot) => {
    //     // upload in progress
    //     upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //   },
    //   (error) => {
    //     // upload failed
    //     console.log(error)
    //   },
    //   () => {
    //     // upload success
    //     upload.url = uploadTask.snapshot.downloadURL
    //     upload.name = upload.file.name
    //     this.saveFileData(upload)
    //   }
    // );
  }
}
