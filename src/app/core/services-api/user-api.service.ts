import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/api/user/user';
import { SessionService } from '../services/session.service';
import { environment as ENV } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(
    private _http: HttpClient,
    private _sessionService: SessionService
  ) { }








  async getClassroomUsers(classroomId: number): Promise<User[]>{
    try {
      return await this._http.get<User[]>(
        ENV.baseApiUrl + 'classroom/' + classroomId + '/users',
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')),
        }
      ).toPromise();
    } catch (error) {
      this.handleError(error);
    }
    return null;//never happens
  }


  async activateUser(user: User): Promise<User>{
    const body =
    {
      email: user.email,
      fullName: user.fullName,
      password: user.password,
      verifyEmailToken: user.verifyEmailToken
    };
    console.log(body);
    try {
      return await this._http.post<User>(
        ENV.baseApiUrl + 'user/' + user.email + '/activate',
        body,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')),
        }
      ).toPromise();
    } catch (error) {
      this.handleError(error);
    }
    return null;//never happens
  }









  handleError(err: HttpErrorResponse){
    if(err.status == 401){
      this._sessionService.logout();
      throw new Error(err.message);
    }
    else{
      throw new Error(err.message);
    }
  }
}
