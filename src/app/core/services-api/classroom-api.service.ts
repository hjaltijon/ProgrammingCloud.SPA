import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassroomInvite } from 'src/app/models/api/classroom-invite';
import { Classroom } from 'src/app/models/api/classroom/classroom';
import { environment as ENV } from '../../../environments/environment';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class ClassroomApiService {

  constructor(private _http: HttpClient,
    private _sessionService: SessionService) { }


    async getClassrooms(userId: number): Promise<Classroom[]>{
      try {
        return await this._http.get<Classroom[]>(
          ENV.baseApiUrl + 'user/' + userId + '/classrooms',
          {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')),
          }
        ).toPromise();
      } catch (error) {
        this.handleError(error);
      }
      return null;//never happens
    }

    async getClassroom(classroomId: number): Promise<Classroom>{
      try {
        return await this._http.get<Classroom>(
          ENV.baseApiUrl + 'classrooms/' + classroomId,
          {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')),
          }
        ).toPromise();
      } catch (error) {
        this.handleError(error);
      }
      return null;//never happens
    }

    async getClassroomInvites(classroomId: number): Promise<ClassroomInvite[]>{
      try {
        return await this._http.get<ClassroomInvite[]>(
          ENV.baseApiUrl + 'classroom/' + classroomId + '/invites',
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
