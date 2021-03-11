import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { NavigationEnd, Router } from '@angular/router';
import { SessionService } from './core/services/session.service';
import { SharedDataService } from './core/services/shared-data.service';
import { User } from './models/api/user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ProgrammingCloud';

  currentPage: string = null;

  links = ['Classrooms', 'Problems', 'Profile'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  constructor(
    private _router: Router,
    private _sessionService: SessionService,
    private _sharedDataService: SharedDataService
  ) {
    this._router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd){
        this.currentPage = val.urlAfterRedirects;
        console.log(val.urlAfterRedirects);
      }
  });
  }

  enableProblemsTab = false;
  ngOnInit(){
    let currentUser: User = this._sharedDataService.currentUser.value;
    if(currentUser.actionAccessMappings["GetProblems"] === 8){
      this.enableProblemsTab = true;
    }
  }

  
  

  logout(){
    this._sessionService.logout();
  }
}
