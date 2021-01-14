import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './feature-modules/login/login.module';
import { CoreModule } from './core/core.module';
import { ClassroomsModule } from './feature-modules/classrooms/classrooms.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ProblemsModule } from './feature-modules/problems/problems.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', pathMatch: 'full', redirectTo: 'login'}
      // ,
      // {path: 'login', component: LoginComponent},
      // {path: 'classes', component: ClassesComponent}    
    ]),
    BrowserAnimationsModule,
    LoginModule,
    ClassroomsModule,
    CoreModule,
    MatButtonModule,
    MatTabsModule,
    ProblemsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
