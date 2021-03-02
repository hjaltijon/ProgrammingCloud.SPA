import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomApiService } from 'src/app/core/services-api/classroom-api.service';
import { ProblemApiService } from 'src/app/core/services-api/problem-api.service';
import { CodeEditorService } from 'src/app/core/services/code-editor.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { Classroom } from 'src/app/models/api/classroom/classroom';
import { CodeExecutionResult } from 'src/app/models/api/code-execution/code-execution-result';
import { CompilerError } from 'src/app/models/api/compiler-error';
import { Problem } from 'src/app/models/api/problem/problem';

@Component({
  selector: 'app-problem-solving',
  templateUrl: './problem-solving.component.html',
  styleUrls: ['./problem-solving.component.scss']
})
export class ProblemSolvingComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _problemApiService: ProblemApiService,
    private _classroomApiService: ClassroomApiService,
    private _router: Router,
    private _editorService: CodeEditorService,
    private _sharedDataService: SharedDataService
    ) { }


  problem: Problem = null;
  classroom: Classroom = null;
  loadingData: boolean = true;
  async ngOnInit(): Promise<void> {
    let loadEditorPromise = this._editorService.loadEditor();


    let problemId = this._route.snapshot.paramMap.get('problemId');
    let classroomId = this._route.snapshot.paramMap.get('classroomId');
    if(!isNaN(parseInt(problemId))){
      let problemPromise = await this._problemApiService.getProblem(parseInt(problemId));
      let classroomPromise = await this._classroomApiService.getClassroom(parseInt(classroomId));

      this.problem = await problemPromise;
      this.classroom = await classroomPromise;
    }
    else{//flawed route
      this._router.navigate(['/classrooms']);
    }


    await loadEditorPromise;
    this.loadingData = false;
  }



  studentCode: string = "";
  updateStudentCode(code: string){
    this.studentCode = code;
    this.compile();
  }

  studentEditorCompilerErrors: CompilerError[] = null;
  async compile(){
    if(await this._sharedDataService.debounce(500, "problem-solving-editor")) return;
    let errors = await this._problemApiService.compile(this.studentCode, this.problem.problemId);
    this.studentEditorCompilerErrors = errors.filter(error => error.type === "StudentEditorError");
  }

  showSpinner: boolean = false;


  codeExecutionResult: CodeExecutionResult = null;
  displayedColumns: string[] = ['name', 'outcome', 'input', 'expected', 'actual', 'message'];
  async execute(){
    this.showSpinner = true;
    let result: CodeExecutionResult = await this._problemApiService.executeCode(this.studentCode, this.problem.problemId);
    this.codeExecutionResult = result;
    console.log(result);
    this.showSpinner = false;
  }
  
  closeExecutionResult(){
    this.codeExecutionResult = null;
  }
}
