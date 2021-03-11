import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from 'src/app/core/services-api/user-api.service';
import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/models/api/user/user';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {




  constructor(
    private _router: Router,
    private _sessionService: SessionService,
    private _route: ActivatedRoute,
    private _userApiService: UserApiService,
    private _snackBar: MatSnackBar
  ) { }

  email: string = "";
  ngOnInit(): void {
    if(this._sessionService.isLoggedIn()){
      this._router.navigate(['/classrooms']);
    }
    this.email = this._route.snapshot.queryParamMap.get('email');
    this.form.controls['email'].setValue(this.email);
  }


  form: FormGroup = new FormGroup({
    email: new FormControl({
      value: "example@example.com",
      disabled: true
    }, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    fullName: new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ])
  });
  


  errorMessage: string = null;
  showSpinner: boolean = false;
  async activate(): Promise<void>{
    this.showSpinner = true;
    if (this.form.valid) {
      let user: User = new User();
      console.log(this.form);
      user.email = this.email;
      user.fullName = this.form.value.fullName;
      user.password = this.form.value.password;
      user.verifyEmailToken = this._route.snapshot.queryParamMap.get('verifyEmailToken').replace(" ", "+"); //need to replace because + will otherwise be treated as space
      await this._userApiService.activateUser(user);

      this._snackBar.open("Account successfully created, please login to your account", "Ok", {
        duration: 4000,
        verticalPosition: "top"
      });
      this.showSpinner = false;
      this._router.navigate(['/login']);


      // // let dialog = this.openGenericDialog();
      // this.errorMessage = null;
      // this.showSpinner = true;
      // let success: boolean = false;
      // try {
      //   success = await this._sessionService.login(this.form.value.email, this.form.value.password);
      // } catch (error) {
      //   success = null; //if the request to ids fails, it will cause an exception
      // }
      // this.showSpinner = false;
      // // dialog.close();
      // if(success){
      //   this._router.navigate(['/classrooms']);
      // }
      // else if(success === null){
      //   this.errorMessage = "Something went wrong. Try again later.";
      // }
      // else{
      //   this.errorMessage = "Email or password was incorrect.";
      // }
      
    }
  }

}
