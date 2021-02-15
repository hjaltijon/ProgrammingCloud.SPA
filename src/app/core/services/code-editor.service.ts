import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeEditorService {

  // monacoEditorLoaded = new BehaviorSubject<boolean>(false);

  // constructor() {
  //   const onGotAmdLoader = () => {
  //     // Load monaco
  //     (<any>window).require(["vs/editor/editor.main"], () => {
  //       this.monacoEditorLoaded.next(true);
  //     });
  //   };
 
  //   // Load AMD loader if necessary
  //   if (!(<any>window).require) {
  //     const loaderScript = document.createElement("script");
  //     loaderScript.type = "text/javascript";
  //     loaderScript.src = "vs/loader.js";
  //     loaderScript.addEventListener("load", onGotAmdLoader);
  //     document.body.appendChild(loaderScript);
  //   } else {
  //     onGotAmdLoader();
  //   }
  // }

  private loadingPromise: Promise<void> = null;
  public async loadEditor(): Promise<void>{
    if(this.loadingPromise == null){  //if it has not started loading yet.
      this.loadingPromise = this.createLoadingPromise();
      return this.loadingPromise;
    }
    return this.loadingPromise;
  }

  private async createLoadingPromise(): Promise<void>{
    await this._loadAMDloader();
    await this._loadMonaco();
  }

  private async _loadAMDloader(): Promise<void>{
    return new Promise((resolve, reject) => {
      // Create script element and set attributes
      const loaderScript = document.createElement('script')
      loaderScript.type = 'text/javascript'
      loaderScript.async = true
      loaderScript.src = "vs/loader.js";

      // Append the script to the DOM
      document.body.appendChild(loaderScript);

      // Resolve the promise once the script is loaded
      loaderScript.addEventListener('load', () => {
        //resolve(loaderScript)
        resolve(undefined)
      })
    })
  }

  private async _loadMonaco(): Promise<void>{
    return new Promise((resolve, reject) => {
      (<any>window).require(["vs/editor/editor.main"], () => {
        resolve(undefined);
      });
    })
  }



}
