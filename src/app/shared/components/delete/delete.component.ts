import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  confirmDelete = new EventEmitter();
  cancelDelete = new EventEmitter();
  confirmMessage = 'Are you sure ?';
  confirmText = 'Confirm';
  cancelText = 'Cancel';
  isLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataSources,
    public dialogRef: MatDialogRef<DeleteComponent>
  ) {}

  ngOnInit() {}

  confirmAction() {
    this.confirmDelete.emit(true);
    this.dialogRef.close({data: true});
  }

  onCancelPopup(): void {
    this.dialogRef.close({data: false});
  }
}

interface DataSources {
  data: any;
}
