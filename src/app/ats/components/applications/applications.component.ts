import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddCandidateComponent } from '../add-candidate/add-candidate.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  addCandidate() {
    const dg = this.dialog.open(AddCandidateComponent,
      {
        width: '500px',
        height: '500px'
      }
    ).afterClosed().subscribe(res => {
     console.log(res);
    })

  }
}
