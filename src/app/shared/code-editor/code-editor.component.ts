import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CodeEditorService } from 'src/app/core/services/code-editor.service';

declare const monaco: any;

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements AfterViewInit {

  @ViewChild("editor") editorContent: ElementRef;
  @Input() initialCode: string;
  @Output() codeChangedEvent = new EventEmitter<string>();

  editor: any;
  constructor(
    private _editorService: CodeEditorService
  ) { }

  async ngAfterViewInit(): Promise<void> {
    this._editorService.loadEditor();
    this.initMonaco();
  }


  // Will be called once monaco library is available
  initMonaco() {
    let code = this.initialCode;
    if(code == null){
      code = [
          "function x() {",
          "\tconsole.log('Hello world!');",
          "}"
        ].join("\n");
    }
    const myDiv: HTMLDivElement = this.editorContent.nativeElement;
    this.editor = monaco.editor.create(myDiv, {
      // value: [
      //   "function x() {",
      //   "\tconsole.log('Hello world!');",
      //   "}"
      // ].join("\n"),
      value: code,
      language: "javascript",
      theme: "vs-dark"
    });

    this.codeChangedEvent.emit(this.editor.getValue());
    this.editor.onDidChangeModelContent((e: any)  => {
      this.codeChangedEvent.emit(this.editor.getValue());
    });
  }


}
