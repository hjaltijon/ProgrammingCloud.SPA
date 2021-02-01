import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CodeEditorService } from 'src/app/core/services/code-editor.service';

declare const monaco: any;

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements AfterViewInit {

  @ViewChild("editor") editorContent: ElementRef;
  @Output() codeChangedEvent = new EventEmitter<string>();

  editor: any;
  constructor(
    private _editorService: CodeEditorService
  ) { }

  editorLoadedSubscription: Subscription;
  ngAfterViewInit(): void {
    this.editorLoadedSubscription = this._editorService.monacoEditorLoaded.subscribe(loaded => {
      if(loaded == true){
        this.initMonaco();
      }
    })
  }


  // Will be called once monaco library is available
  initMonaco() {
    const myDiv: HTMLDivElement = this.editorContent.nativeElement;
    this.editor = monaco.editor.create(myDiv, {
      value: [
        "function x() {",
        "\tconsole.log('Hello world!');",
        "}"
      ].join("\n"),
      language: "javascript",
      theme: "vs-dark"
    });

    this.codeChangedEvent.emit(this.editor.getValue());
    this.editor.onDidChangeModelContent((e: any)  => {
      this.codeChangedEvent.emit(this.editor.getValue());
    });
  }


  ngOnDestroy() {
    this.editorLoadedSubscription.unsubscribe();
  }


}
