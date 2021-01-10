import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessToken } from 'src/app/models/api/user/access-token';
import { User } from 'src/app/models/api/user/user';

import { environment as ENV } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  

  constructor(
    private _http: HttpClient
  ) { }

  async login(email: string, password: string): Promise<boolean>{
    let accessToken = await this.getAccessToken(email, password);
    if(!accessToken) return false;

    let currentUserPromise = this.getCurrentUser(email, accessToken);
    
    let currentUser = await currentUserPromise;
    
    if(!currentUser) return false;
    

    localStorage.setItem("access_token", accessToken);
    
    
    //this.setLogoutTimer(accessToken);
    return true;
  }

  async getCurrentUser(email: string, token: string): Promise<User | null>{
    try {
      return await this._http.get<User>(
        ENV.baseApiUrl + 'users/' + email,
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

  async getAccessToken(email: string, password: string): Promise<string | null>{
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
