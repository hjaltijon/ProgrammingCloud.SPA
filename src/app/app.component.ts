import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { NavigationEnd, Router } from '@angular/router';
import { SessionService } from './core/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProgrammingCloud';

  currentPage: string = null;

  links = ['Classrooms', 'Problems', 'Profile'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  constructor(
    private _router: Router,
    private _sessionService: SessionService
  ) {
    this._router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd){
        this.currentPage = val.urlAfterRedirects;
      }
  });
  }

  

  logout(){
    this._sessionService.logout();
    
  }
}
