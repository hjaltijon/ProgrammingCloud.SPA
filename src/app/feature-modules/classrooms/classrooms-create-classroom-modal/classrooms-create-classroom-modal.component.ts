import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-classrooms-create-classroom-modal',
  templateUrl: './classrooms-create-classroom-modal.component.html',
  styleUrls: ['./classrooms-create-classroom-modal.component.scss']
})
export class ClassroomsCreateClassroomModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ClassroomsCreateClassroomModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  
  ngOnInit(): void {
  }

  

  classroom =  new FormControl('', [
    Validators.maxLength(200),
    Validators.required
  ]);

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  createClassroom(){
    this.dialogRef.close(this.classroom.value);
  }

}
