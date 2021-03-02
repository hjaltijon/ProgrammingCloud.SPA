import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassroomApiService } from 'src/app/core/services-api/classroom-api.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { Classroom } from 'src/app/models/api/classroom/classroom';
import { User } from 'src/app/models/api/user/user';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

  constructor(
    private _sharedDataService: SharedDataService,
    private _classroomApiService: ClassroomApiService,
    private _route: ActivatedRoute) { }

  classroom: Classroom;
  loadingData: boolean = true;
  enableStudentAndInviteTabs: boolean = false;
  async ngOnInit(): Promise<void> {
    this.loadingData = true;
    let classroomId: number = +this._route.snapshot.paramMap.get('classroomId');
    this.classroom = await this._classroomApiService.getClassroom(classroomId);
    let currentUser: User = this._sharedDataService.currentUser.value;

    if(currentUser.actionAccessMappings["GetClassroomUsers"] === 8 && this.classroom.teacherId === currentUser.userId){
      this.enableStudentAndInviteTabs = true;
    }

    this.loadingData = false;
  }

}
