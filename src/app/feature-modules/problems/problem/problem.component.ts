import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProblemApiService } from 'src/app/core/services-api/problem-api.service';
import { CodeEditorService } from 'src/app/core/services/code-editor.service';
import { Problem } from 'src/app/models/api/problem/problem';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

  constructor(
    private _editorService: CodeEditorService,
    private _route: ActivatedRoute,
    private _problemApiService: ProblemApiService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { 
  }

  componentMode: string = null;
  problemId: number = null;
  initialStudentStartingCode: string = null;
  initialTestingCode: string = null;
  loadingData: boolean = true;
  async ngOnInit(): Promise<void> {
    let loadEditorPromise = this._editorService.loadEditor();
    let problemId = this._route.snapshot.paramMap.get('problemId');
    if(problemId == "new"){ //CREATE
      this.componentMode = "create";
    }
    else if(!isNaN(parseInt(problemId))){ //UPDATE
      this.componentMode = "update";
      this.problemId = parseInt(problemId);
      let problem = await this._problemApiService.getProblem(parseInt(problemId));
      this.title.setValue(problem.title);
      this.description.setValue(problem.description);
      this.initialStudentStartingCode = problem.studentStartingCode;
      this.initialTestingCode = problem.testingCode;
    }
    else{ //FLAWED ROUTE
      this._router.navigate(['/problems']);
    }

    await loadEditorPromise;
    this.loadingData = false
  }


  
  title =  new FormControl('', [
    Validators.required,
    Validators.maxLength(200)
  ]);
  description =  new FormControl('', [
    Validators.maxLength(4000),
  ]);

  showSpinner: boolean = false;
  async save(){
    if(this.studentStartingCode.length > 4000 || this.testingCode.length > 4000){
      alert("Text editor code can not exceed 4000 characters!");
      return;
    }
    
    this.showSpinner = true;

    let problem = new Problem();
    problem.description = this.description.value;
    problem.title = this.title.value;
    problem.studentStartingCode = this.studentStartingCode;
    problem.testingCode = this.testingCode;
    if(this.componentMode == "create"){
      let newProblem = await this._problemApiService.createProblem(problem);
      this._snackBar.open("Problem successfully created", "Ok", {
        duration: 2000
      });
      this.componentMode = "update";
      this._router.navigate(['/problems/' + newProblem.problemId]);
    }
    else if(this.componentMode == "update"){
      problem.problemId = this.problemId;
      await this._problemApiService.updateProblem(problem, ["description", "title", "testingCode", "studentStartingCode"]);
      this._snackBar.open("Problem successfully updated", "Ok", {
        duration: 2000,
      });
      this._router.navigate(['/problems/' + this.problemId]);
    }
    else{
      throw new Error("Unexpected error when saving data in problem component")
    }
    this.showSpinner = false;
  }

  
  studentStartingCode: string = "";
  testingCode: string = "";
  updateStudentCode(code: string){
    this.studentStartingCode = code;
  }

  updateTestCode(code: string){
    this.testingCode = code;
  }

}
