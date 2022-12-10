import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Users } from 'src/app/service/user/user';
import { CommonModule } from '@angular/common';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  users: Users[]=[];
  init: Users;
  passUser: BehaviorSubject<Users>;
  constructor(private http: HttpClient) { }
  
  passUserValue$: Subject<Users> = new Subject();
  get passUserValue(): Subject<Users> {
    return this.passUserValue$;
  }
  set passUserValue(src: Subject<Users>) {
    this.passUserValue$ = src;
  }
  getPassUserValue(user: Users) {
    this.passUserValue$.next(user);
  }
  //end subject

  //behavior subject
  nextUser(user: Users) {
    this.passUser.next(user);
  }

  getAllUsers(){
    return this.http.get("http://localhost:8080/user/all").pipe(map(resp=>resp));
  }

loginUser(email: string){
  return this.http.get(`http://localhost:8080/user/login`).pipe
    map((resp=>resp));
      
}

saveUser(user: FormData){
  return this.http
      .post('http://localhost:8080/user/create', user)
      .pipe(map((resp) => resp));
  // return this.http.post("http://localhost:8080/user/create",user).pipe(map(resp=>resp));
}

getUser(user_id: number){
  return this.http.get(`http://localhost:8080/user/${user_id}`)
  .pipe(map(resp=>resp));
}

postTicket(ticket:any){
  return this.http.post("http://localhost:8080/ticket/create",this.users).pipe(map(resp=>resp));
}

addTicket(){
  return this.http.post("http://localhost:8080/ticket/create",this.users).pipe(map(resp=>resp));
}

updateUser(user_id: number) {
    // return this.http
    //   .put(`http://localhost:8080/user/${user_id}/update`, user)
    //   .pipe(map((resp) => resp));
    return this.http.get(`http://localhost:8080/user/${user_id}/update`).pipe(
    map((response) => {
      var users = [];
      for(const key in response){
        if(response.hasOwnProperty(key)){
          if(key==='data'){
            users.push(...(response as any)[key]);
          }
        }
      }
      return users;
    })
  );
  }

}
