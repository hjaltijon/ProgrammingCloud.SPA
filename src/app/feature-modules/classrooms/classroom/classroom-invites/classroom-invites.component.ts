import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassroomApiService } from 'src/app/core/services-api/classroom-api.service';
import { ClassroomInvite } from 'src/app/models/api/classroom-invite';

@Component({
  selector: 'app-classroom-invites',
  templateUrl: './classroom-invites.component.html',
  styleUrls: ['./classroom-invites.component.scss']
})
export class ClassroomInvitesComponent implements OnInit {

  displayedColumns: string[] = ['email', 'date'];

  constructor(
    private _classroomApiService: ClassroomApiService,
    private _route: ActivatedRoute) { }

    invites: ClassroomInvite[];
    loadingData: boolean = true;
    classroomId: number = null;
    async ngOnInit(): Promise<void> {
      this.loadingData = true;
      let classroomId: number = parseInt(this._route.snapshot.paramMap.get('classroomId'));
      this.classroomId = classroomId;
      this.invites = await this._classroomApiService.getClassroomInvites(classroomId)
      this.loadingData = false;
    }
}
