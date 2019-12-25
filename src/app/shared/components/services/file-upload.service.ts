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
    const folderName = upload.name;
    const storageRef = this.storage.ref(``);
    let uploadTask = storageRef.child(`${this.basePath}/${folderName}/${upload.file.name.trim()}`)
    .put(upload.file).then(function(snapshot) {
      console.log('Uploaded CV!');
    });
    upload.url = 'https://firebasestorage.googleapis.com/v0/b/sdats-83300.appspot.com/o' +
    `${this.basePath}%2F${folderName}%2F${upload.file.name.trim()}` + '?alt=media';
    return  upload.url;
  }
}
