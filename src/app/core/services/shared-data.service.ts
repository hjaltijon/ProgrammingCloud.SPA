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

  




  debounceDictionary: { [key: string] : Date; } = {}
  async debounce(ms: number, key: string): Promise<boolean>{
    let timeAtLastTypedLetter = new Date();
    this.debounceDictionary[key] = timeAtLastTypedLetter;
    await this.timeout(ms);
    if(timeAtLastTypedLetter != this.debounceDictionary[key]){
      return true;
    }
    return false;
  }

  async timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
