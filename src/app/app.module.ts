import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './feature-modules/login/login.module';
import { ClassesModule } from './feature-modules/classes/classes.module';
import { CoreModule } from './core/core.module';

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
    ClassesModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
