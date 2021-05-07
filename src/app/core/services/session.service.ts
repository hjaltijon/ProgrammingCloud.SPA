import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccessToken } from 'src/app/models/api/user/access-token';
import { User } from 'src/app/models/api/user/user';

import { environment as ENV } from '../../../environments/environment';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  

  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _sharedDataService: SharedDataService
  ) { }

  async login(email: string, password: string): Promise<boolean>{
    let accessToken = await this.getAccessToken(email, password);
    if(!accessToken) return false;

    let userId = JSON.parse(atob(accessToken.split('.')[1])).userId;
    let currentUserPromise = this.getCurrentUser(userId, accessToken);
    
    let currentUser = await currentUserPromise;
    
    if(!currentUser) return false;
    
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("current_user", JSON.stringify(currentUser));
    this._sharedDataService.currentUser.next(currentUser);

    //this.setLogoutTimer(accessToken);
    return true;
  }

  isLoggedIn(): boolean{
    if(localStorage.getItem("current_user") != null){
      return true;
    }
    return false;
  }

  logout(): void {
    //clearTimeout(this.logoutTimer);
    localStorage.clear();
    this._sharedDataService.currentUser.next(null);
    this._router.navigate(['/login']);
  }

  async getCurrentUser(userId: number, token: string): Promise<User>{
    try {
      return await this._http.get<User>(
        ENV.baseApiUrl + 'users/' + userId,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
        }
      ).toPromise();

    } catch (error) {
      if(error.status == 401){
        return null;
      }
      else{
        throw new Error(error.message);
      }
    }
  }

  async getAccessToken(email: string, password: string): Promise<string>{
    const body = {
      password: password
    };

    try {
      return (await this._http.post<AccessToken>(
        ENV.baseApiUrl + 'users/' + email + '/access-token',
        body
      ).toPromise()).accessToken;
    } catch (error) {
      if(error.status == 401){
        return null;
      }
      else{
        throw new Error(error.message);
      }
    }
  }

}
