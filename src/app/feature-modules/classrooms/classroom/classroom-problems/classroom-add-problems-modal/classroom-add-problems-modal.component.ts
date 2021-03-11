import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProblemApiService } from 'src/app/core/services-api/problem-api.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { Problem } from 'src/app/models/api/problem/problem';
import { User } from 'src/app/models/api/user/user';

@Component({
  selector: 'app-classroom-add-problems-modal',
  templateUrl: './classroom-add-problems-modal.component.html',
  styleUrls: ['./classroom-add-problems-modal.component.scss']
})
export class ClassroomAddProblemsModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ClassroomAddProblemsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _sharedDataService: SharedDataService,
    private _problemApiService: ProblemApiService) 
  { }

  loadingData: boolean = true;
  problems: Problem[];
  async ngOnInit(): Promise<void> {
    this.loadingData = true;
    let currentUser: User = this._sharedDataService.currentUser.value;
    this.problems = (await this._problemApiService.getProblems(currentUser.userId)).filter(p => !this.classroomAlreadyContainsProblem(p.problemId));
    this.loadingData = false;
  }


  classroomAlreadyContainsProblem(problemId: number){
    let cProblems: Problem[] = this.data.classroomProblems;
    return cProblems.filter(cp => cp.problemId == problemId).length > 0;
  }

  assignProblems(selectedIds: any){
    let productsToAdd: number[] = selectedIds.map((id: any) => id.value)
    this.dialogRef.close(productsToAdd);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
