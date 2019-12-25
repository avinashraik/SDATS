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
    // const httpsReference = this.storage.storage
    // .refFromURL('https://firebasestorage.googleapis.com/b/bucket/o/uploads/' + folderName + '/' + upload.file.name);
    // const httpsReference = this.storage.storage
    // .refFromURL('gs://bucket/uploads/' + folderName + '/' + upload.file.name);
    // storageRef.child(`${this.basePath}/${folderName}/${upload.file.name}`).getDownloadURL().subscribe(e => {
    //   debugger;
    //   upload.url = e;
    // });
    // storageRef.child(`${this.basePath}/${folderName}/${upload.file.name}`).getDownloadURL().subscribe((url) => {
    //   upload.url = url;
    //   // Get the download URL for 'images/stars.jpg'
    //   // This can be inserted into an <img> tag
    //   // This can also be downloaded directly
    // })
    upload.url = 'https://firebasestorage.googleapis.com/v0/b/sdats-83300.appspot.com/o' +
    `${this.basePath}%2F${folderName}%2F${upload.file.name.trim()}` + '?alt=media';
    return  upload.url;


    // this.storage.upload(`${this.basePath}/${folderName}/`, upload.file).then(res => {
    //   storageRef.getDownloadURL().subscribe(e => {
    //     upload.url = e;
    //   });
    //   upload.name = upload.file.name;
    //   console.log('uploaded');
    // }).catch(err => {
    //   console.log(err);
    // })

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
