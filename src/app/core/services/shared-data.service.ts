import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/api/user/user';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  // currentUser = new BehaviorSubject<User>(null);
  currentUser: BehaviorSubject<User>;

  constructor(
  ) { 
    this.currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("current_user")));
  }

  


}
