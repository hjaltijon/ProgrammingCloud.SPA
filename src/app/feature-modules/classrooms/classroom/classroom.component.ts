import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassroomApiService } from 'src/app/core/services-api/classroom-api.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { Classroom } from 'src/app/models/api/classroom/classroom';

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
  async ngOnInit(): Promise<void> {
    this.loadingData = true;
    let classroomId: number = +this._route.snapshot.paramMap.get('classroomId');
    this.classroom = await this._classroomApiService.getClassroom(classroomId);
    this.loadingData = false;
  }

}
