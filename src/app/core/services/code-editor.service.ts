import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeEditorService {

  monacoEditorLoaded = new BehaviorSubject<boolean>(false);

  constructor() {
    const onGotAmdLoader = () => {
      // Load monaco
      (<any>window).require(["vs/editor/editor.main"], () => {
        this.monacoEditorLoaded.next(true);
      });
    };
 
    // Load AMD loader if necessary
    if (!(<any>window).require) {
      const loaderScript = document.createElement("script");
      loaderScript.type = "text/javascript";
      loaderScript.src = "vs/loader.js";
      loaderScript.addEventListener("load", onGotAmdLoader);
      document.body.appendChild(loaderScript);
    } else {
      onGotAmdLoader();
    }
  }
}
