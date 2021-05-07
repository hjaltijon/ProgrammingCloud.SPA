import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProblemApiService } from 'src/app/core/services-api/problem-api.service';
import { CodeEditorService } from 'src/app/core/services/code-editor.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { CompilerError } from 'src/app/models/api/compiler-error';
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
    private _snackBar: MatSnackBar,
    private _sharedDataService: SharedDataService
  ) { 
  }

  componentMode: string = null;
  problemId: number = null;
  initialStudentStartingCode: string = "public static int SumOfTwoNumbers(int a, int b)\n{\n    //Return the sum of two numbers\n}";
  initialTestingCode: string = "using System;\nusing System.Collections.Generic;\nusing System.Text.Json;\nnamespace TeacherTestingNameSpace{\t//Do not change the name of this namespace\n    public class TeacherTestingClass{\t//Do not change the name of this class\n        public string TeacherTestingFunction()\t//Do not change the name of this function\n\t\t{\n\t\t\t//This is just an example to get you started.\n\t\t\t//You can edit this function in any way you want.\n\t\t\t//Note though that this function must return a..\n\t\t\t//.. JSON string with a specific format, otherwise..\n\t\t\t//.. the UI won't know how to display the results.\n\n\t\t\t//Test the student function:\n\t\t\tint sum1 = SumOfTwoNumbers(1, 2);\t//=3\n\t\t\tint sum2 = SumOfTwoNumbers(-2, 2);\t//=0\n\n\t\t\t//Create test result objects:\n\t\t\tvar test1 = new Test();\n\t\t\ttest1.Name = \"Test 1\";\n\t\t\ttest1.Success = (sum1 == 3);\n\t\t\ttest1.Expected = \"3\";\n\t\t\ttest1.Actual = sum1.ToString();\n\t\t\ttest1.Input = \"(1, 2)\";\n\t\t\ttest1.Message = \"\";\n\n\t\t\tvar test2 = new Test();\n\t\t\ttest2.Name = \"Test 2\";\n\t\t\ttest2.Success = (sum2 == 0);\n\t\t\ttest2.Expected = \"0\";\n\t\t\ttest2.Actual = sum2.ToString();\n\t\t\ttest2.Input = \"(-2, 2)\";\n\t\t\ttest2.Message = \"\";\n\n\t\t\t//add the test results to a list:\n            var result = new List<Test>();\n            result.Add(test1);\n            result.Add(test2);\n        \n\t\t\t//return the test result list as a JSON string:\n            return JsonSerializer.Serialize(result);\n        }\n\n\t\t//<[!!!THIS_COMMENT_WILL_BE_REPLACED_BY_STUDENT_CODE!!!]>\n    }\n\n    public class Test\n    {\n        public string Name { get; set; }\n        public bool Success { get; set; }\n        public string Expected { get; set; }\n        public string Actual { get; set; }\n        public string Input { get; set; }\n        public string Message { get; set; }\n    }\n}";
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
      this.problemId = newProblem.problemId;
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
    this.compile()
  }

  updateTestCode(code: string){
    this.testingCode = code;
    this.compile()
  }


  studentEditorCompilerErrors: CompilerError[] = null;
  teacherEditorCompilerErrors: CompilerError[] = null;
  async compile(){
    if(await this._sharedDataService.debounce(500, "problem-creation-editor")) return;
    let errors = await this._problemApiService.compile(this.studentStartingCode, this.problemId, this.testingCode);
    this.studentEditorCompilerErrors = errors.filter(error => error.type === "StudentEditorError");
    this.teacherEditorCompilerErrors = errors.filter(error => error.type === "TeacherEditorError");
  }

}
