import { Component, OnInit } from '@angular/core';
import { ClassroomApiService } from 'src/app/core/services-api/classroom-api.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { Classroom } from 'src/app/models/api/classroom/classroom';
import { User } from 'src/app/models/api/user/user';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit {

  constructor(
    private _sharedDataService: SharedDataService,
    private _classroomApiService: ClassroomApiService ) { }


  classrooms: Classroom[];
  displayedColumns: string[] = ['title', 'teacherName', 'date'];

  loadingData: boolean = true;
  async ngOnInit(): Promise<void> {
    //console.log(this._sharedDataService.currentUser.value);
    this.loadingData = true;
    let currentUser: User = this._sharedDataService.currentUser.value;
    this.classrooms = await this._classroomApiService.getClassrooms(currentUser.userId);
    this.loadingData = false;
  }

}
