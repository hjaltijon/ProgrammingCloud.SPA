import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CodeEditorService } from 'src/app/core/services/code-editor.service';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

  constructor(
    private _editorService: CodeEditorService,
    private cd: ChangeDetectorRef
  ) { 
  }

  editorLoadedSubscription: Subscription;
  loadingData: boolean = true;
  ngOnInit(): void {
    this.editorLoadedSubscription = this._editorService.monacoEditorLoaded.subscribe(loaded => {
      if(loaded == true){
        console.log("asdfasdfasdf");
        this.loadingData = false;
        console.log(this.loadingData);
        this.cd.detectChanges();
      }
    })
  }


  

  
  studentCode: string = "";
  testCode: string = "";
  updateStudentCode(code: string){
    this.studentCode = code;
  }

  updateTestCode(code: string){
    this.testCode = code;
  }

  ngOnDestroy() {
    this.editorLoadedSubscription.unsubscribe();
  }

}
