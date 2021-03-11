import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CodeExecutionResult } from 'src/app/models/api/code-execution/code-execution-result';
import { CompilerError } from 'src/app/models/api/compiler-error';
import { Problem } from 'src/app/models/api/problem/problem';
import { createPatchUpdateBody } from 'src/app/shared/helpers';
import { environment as ENV } from '../../../environments/environment';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class ProblemApiService {

  constructor(
    private _http: HttpClient,
    private _sessionService: SessionService
  ) { }

  
  async executeCode(code: string, problemId: number): Promise<CodeExecutionResult>{
    const body =
    {
      studentCode: code,
      problemId: problemId
    };
    try {
      return await this._http.post<CodeExecutionResult>(
        ENV.baseApiUrl + 'compile-run',
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

  async compile(code: string, problemId: number, testingCode: string = null): Promise<CompilerError[]>{
    let useDTOTestingCode = false;
    if(testingCode !== null){
      useDTOTestingCode = true;
    }

    const body =
    {
      studentCode: code,
      problemId: problemId,
      testingCode: testingCode,
      useDTOTestingCode
    };
    try {
      return await this._http.post<CompilerError[]>(
        ENV.baseApiUrl + 'compile',
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

  async getProblems(userId: number): Promise<Problem[]>{
    try {
      return await this._http.get<Problem[]>(
        ENV.baseApiUrl + 'user/' + userId + '/problems',
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')),
        }
      ).toPromise();
    } catch (error) {
      this.handleError(error);
    }
    return null;//never happens
  }

  async getProblem(problemId: number): Promise<Problem>{
    try {
      return await this._http.get<Problem>(
        ENV.baseApiUrl + 'problems/' + problemId,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')),
        }
      ).toPromise();
    } catch (error) {
      this.handleError(error);
    }
    return null;//never happens
  }

  async createProblem(problem: Problem): Promise<Problem>{
    const body =
    {
      title: problem.title,
      studentStartingCode: problem.studentStartingCode,
      testingCode: problem.testingCode,
      description: problem.description
    };
    try {
      return await this._http.post<Problem>(
        ENV.baseApiUrl + 'problems',
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

  async updateProblem(problem: Problem, propertiesToReplace: string[]): Promise<Problem>{
    const body = createPatchUpdateBody(problem, propertiesToReplace);
    try {
      return await this._http.patch<Problem>(
        ENV.baseApiUrl + 'problems/' + problem.problemId,
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

  async getClassroomProblems(classroomId: number): Promise<Problem[]>{
    try {
      return await this._http.get<Problem[]>(
        ENV.baseApiUrl + 'classroom/' + classroomId + '/problems',
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')),
        }
      ).toPromise();
    } catch (error) {
      this.handleError(error);
    }
    return null;//never happens
  }

  async createProblemClassroomRelation(classroomId: number, problemId: number): Promise<void>{
    const body =
    {
      classroomId: classroomId,
      problemId: problemId
    };
    try {
      return await this._http.post<void>(
        ENV.baseApiUrl + 'problem-classroom-relations',
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
