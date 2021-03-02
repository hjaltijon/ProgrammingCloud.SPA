import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CodeEditorService } from 'src/app/core/services/code-editor.service';
import { CompilerError } from 'src/app/models/api/compiler-error';

declare const monaco: any;

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements AfterViewInit, OnChanges  {

  @ViewChild("editor") editorContent: ElementRef;
  @Input() initialCode: string;
  @Input() compilerErrors: CompilerError[];
  @Output() codeChangedEvent = new EventEmitter<string>();

  editor: any;
  constructor(
    private _editorService: CodeEditorService
  ) { }

  monacoInitialized: boolean = false;
  async ngAfterViewInit(): Promise<void> {
    await this._editorService.loadEditor();
    this.initMonaco();
    this.monacoInitialized = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['compilerErrors'] && this.monacoInitialized) {
      this.updateModelMarkers();
    }
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
      language: "csharp",
      theme: "vs-dark",
      automaticLayout: true
    });

    this.codeChangedEvent.emit(this.editor.getValue());
    this.editor.onDidChangeModelContent((e: any)  => {
      this.codeChangedEvent.emit(this.editor.getValue());
    });
  }

  updateModelMarkers(){
    let modelMarkers: any[] = [];
    this.compilerErrors.forEach(error => {
      modelMarkers.push({
        startLineNumber: error.line,
        startColumn: error.column,
        endLineNumber: error.line,
        endColumn: error.column,
        message: error.message,
        severity: monaco.MarkerSeverity.Error
      });
    });
    monaco.editor.setModelMarkers(this.editor.getModel(), 'error', modelMarkers);
  }

}
