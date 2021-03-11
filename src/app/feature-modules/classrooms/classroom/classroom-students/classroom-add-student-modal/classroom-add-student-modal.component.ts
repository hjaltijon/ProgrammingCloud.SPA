import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-classroom-add-student-modal',
  templateUrl: './classroom-add-student-modal.component.html',
  styleUrls: ['./classroom-add-student-modal.component.scss']
})
export class ClassroomAddStudentModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ClassroomAddStudentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  
  ngOnInit(): void {
  }

  

  email =  new FormControl('', [
    Validators.maxLength(255),
    Validators.required,
    Validators.email
  ]);

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  addStudent(){
    this.dialogRef.close(this.email.value);
  }

}
