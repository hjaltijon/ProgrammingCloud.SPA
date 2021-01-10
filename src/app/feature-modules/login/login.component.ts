import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/services/session.service';



//I think this is the default behaviour so I don't really need this unless I call it specifically in the .html(which I am doing atm)
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    //return true;
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private _router: Router,
    private _sessionService: SessionService
  ) {
    // this.form = new FormGroup({
    //   email: new FormControl('', [
    //     Validators.required,
    //     Validators.email,
    //   ]),
    //   password: new FormControl('', [
    //     Validators.required
    //   ])
    // });
  }

  ngOnInit(): void {
  }




  
  errorMessage: string | null = null;
  showSpinner: boolean = false;
  async login(): Promise<void>{
    if (this.form.valid) {
      // let dialog = this.openGenericDialog();
      this.errorMessage = null;
      this.showSpinner = true;
      let success: boolean | null = false;
      try {
        success = await this._sessionService.login(this.form.value.email, this.form.value.password);
      } catch (error) {
        success = null; //if the request to ids fails, it will cause an exception
      }
      
      this.showSpinner = false;
      // dialog.close();
      if(success){
        this._router.navigate(['/class']);
      }
      else if(success === null){
        this.errorMessage = "Something went wrong. Try again later.";
      }
      else{
        this.errorMessage = "Email or password was incorrect.";
      }
    }
  }








}
