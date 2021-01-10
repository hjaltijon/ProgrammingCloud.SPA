import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SessionService } from './services/session.service';
import { UserApiService } from './services-api/user-api.service';
import { SharedDataService } from './services/shared-data.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SessionService,
    UserApiService,
    SharedDataService
  ]
})
export class CoreModule { }
