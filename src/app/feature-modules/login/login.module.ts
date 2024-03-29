import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [LoginComponent, ActivateAccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'login', 
        component: LoginComponent
        // ,
        // children: [
        //   {path: 'reset-password', component: LoginComponent},
        // ]
      },
      {
        path: 'login/activate-account', 
        component: ActivateAccountComponent
      }
    ]),
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class LoginModule { }
