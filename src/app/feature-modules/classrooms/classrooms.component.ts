import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClassroomApiService } from 'src/app/core/services-api/classroom-api.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { Classroom } from 'src/app/models/api/classroom/classroom';
import { User } from 'src/app/models/api/user/user';
import { ClassroomsCreateClassroomModalComponent } from './classrooms-create-classroom-modal/classrooms-create-classroom-modal.component';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit {

  constructor(
    private _sharedDataService: SharedDataService,
    private _classroomApiService: ClassroomApiService,
    public _dialog: MatDialog) 
    { }


  classrooms: Classroom[];
  displayedColumns: string[] = ['title', 'teacherName', 'date'];
  currentUserId: number = null;
  loadingData: boolean = true;
  showCreateButton: boolean = false;
  async ngOnInit(): Promise<void> {
    //console.log(this._sharedDataService.currentUser.value);
    this.loadingData = true;
    let currentUser: User = this._sharedDataService.currentUser.value;
    this.currentUserId = currentUser.userId;
    this.classrooms = await this._classroomApiService.getClassrooms(this.currentUserId);

    if(currentUser.actionAccessMappings["CreateClassroom"] === 8){
      this.showCreateButton = true;
    }

    this.loadingData = false;
  }




  openDialog(): void {
    const dialogRef = this._dialog.open(ClassroomsCreateClassroomModalComponent, {
      width: '580px',
      //data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.createClassroom(result);
    });
  }

  async createClassroom(title: string){
    if(title){
      this.loadingData = true;
      await this._classroomApiService.createClassroom(title);
      this.classrooms = await this._classroomApiService.getClassrooms(this.currentUserId);
      this.loadingData = false;
    }
  }

}
