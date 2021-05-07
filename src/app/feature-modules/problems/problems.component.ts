import { Component, OnInit } from '@angular/core';
import { ProblemApiService } from 'src/app/core/services-api/problem-api.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { Problem } from 'src/app/models/api/problem/problem';
import { User } from 'src/app/models/api/user/user';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.scss']
})
export class ProblemsComponent implements OnInit {

  constructor(
    private _sharedDataService: SharedDataService,
    private _problemApiService: ProblemApiService ) 
  { }


  problems: Problem[];
  displayedColumns: string[] = ['title', 'date'];

  loadingData: boolean = true;
  showCreateButton = false;
  async ngOnInit(): Promise<void> {
    //console.log(this._sharedDataService.currentUser.value);
    this.loadingData = true;
    let currentUser: User = this._sharedDataService.currentUser.value;
    this.problems = await this._problemApiService.getProblems(currentUser.userId);
    this.loadingData = false;
  }


  showCreateNewProblemModal: boolean = false;
  createNewProblem(){
    this.showCreateNewProblemModal = true;
  }

}
