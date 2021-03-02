import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserApiService } from 'src/app/core/services-api/user-api.service';
import { User } from 'src/app/models/api/user/user';

@Component({
  selector: 'app-classroom-students',
  templateUrl: './classroom-students.component.html',
  styleUrls: ['./classroom-students.component.scss']
})
export class ClassroomStudentsComponent implements OnInit {



  displayedColumns: string[] = ['fullName', 'email', 'date'];

  constructor(
    private _userApiService: UserApiService,
    private _route: ActivatedRoute) { }

    users: User[];
    loadingData: boolean = true;
    classroomId: number = null;
    async ngOnInit(): Promise<void> {
      this.loadingData = true;
      let classroomId: number = parseInt(this._route.snapshot.paramMap.get('classroomId'));
      this.classroomId = classroomId;
      this.users = await this._userApiService.getClassroomUsers(classroomId)
      this.loadingData = false;
    }

}
