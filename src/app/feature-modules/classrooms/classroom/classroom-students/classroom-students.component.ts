import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ClassroomApiService } from 'src/app/core/services-api/classroom-api.service';
import { UserApiService } from 'src/app/core/services-api/user-api.service';
import { User } from 'src/app/models/api/user/user';
import { ClassroomAddStudentModalComponent } from './classroom-add-student-modal/classroom-add-student-modal.component';

@Component({
  selector: 'app-classroom-students',
  templateUrl: './classroom-students.component.html',
  styleUrls: ['./classroom-students.component.scss']
})
export class ClassroomStudentsComponent implements OnInit {



  displayedColumns: string[] = ['fullName', 'email', 'date'];

  constructor(
    private _userApiService: UserApiService,
    private _route: ActivatedRoute,
    public _dialog: MatDialog,
    private _classroomApiService: ClassroomApiService) { }

    users: User[];
    loadingData: boolean = true;
    classroomId: number = null;
    async ngOnInit(): Promise<void> {
      this.loadingData = true;
      let classroomId: number = parseInt(this._route.snapshot.paramMap.get('classroomId'));
      this.classroomId = classroomId;
      await this.refreshData();
      this.loadingData = false;
    }





    openDialog(): void {
      const dialogRef = this._dialog.open(ClassroomAddStudentModalComponent, {
        width: '580px',
        //data: {name: this.name, animal: this.animal}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.addStudent(result);
      });
    }


    async refreshData(){
      this.users = await this._userApiService.getClassroomUsers(this.classroomId);
    }

  
    async addStudent(email: string){
      if(!email)
        return;
      this.loadingData = true;
      await this._classroomApiService.createUserClassroomRelation(email, this.classroomId);
      await this.refreshData();
      this.loadingData = false;
    }

}
