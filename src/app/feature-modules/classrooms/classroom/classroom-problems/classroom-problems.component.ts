import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProblemApiService } from 'src/app/core/services-api/problem-api.service';
import { ActivatedRoute } from '@angular/router';
import { Problem } from 'src/app/models/api/problem/problem';
import { MatDialog } from '@angular/material/dialog';
import { ClassroomAddProblemsModalComponent } from './classroom-add-problems-modal/classroom-add-problems-modal.component';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { User } from 'src/app/models/api/user/user';

@Component({
  selector: 'app-classroom-problems',
  templateUrl: './classroom-problems.component.html',
  styleUrls: ['./classroom-problems.component.scss']
})
export class ClassroomProblemsComponent implements OnInit {

  constructor(
    private _problemApiService: ProblemApiService,
    private _route: ActivatedRoute,
    public _dialog: MatDialog,
    private _sharedDataService: SharedDataService
    ) { }

  problems: Problem[];
  loadingData: boolean = true;
  classroomId: number = null;
  showAssignButton: boolean = false;
  async ngOnInit(): Promise<void> {
    this.loadingData = true;
    let classroomId: number = parseInt(this._route.snapshot.paramMap.get('classroomId'));
    this.classroomId = classroomId;
    this.problems = await this._problemApiService.getClassroomProblems(classroomId);
    let currentUser: User = this._sharedDataService.currentUser.value;
    if(currentUser.actionAccessMappings["CreateProblemClassroomRelation"] === 8){
      this.showAssignButton = true;
    }

    this.loadingData = false;
  }



  drop(event: CdkDragDrop<string[]>) {
    //moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    moveItemInArray(this.problems, event.previousIndex, event.currentIndex);
    console.log(event);
  }

  async addProblems(problemIds: number[]){
    this.loadingData = true;
    if(problemIds && problemIds.length > 0){
      let promises: Promise<void>[] = [];
      for (const problemId of problemIds) {
        promises.push(this._problemApiService.createProblemClassroomRelation(this.classroomId, problemId))
      }
      await Promise.all(promises);
      this.problems = await this._problemApiService.getClassroomProblems(this.classroomId);
    }
    this.loadingData = false;
  }


  openDialog(): void {
    const dialogRef = this._dialog.open(ClassroomAddProblemsModalComponent, {
      width: '580px',
      //data: {name: this.name, animal: this.animal}
      data: {classroomProblems: this.problems}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addProblems(result);
    });
  }

}
