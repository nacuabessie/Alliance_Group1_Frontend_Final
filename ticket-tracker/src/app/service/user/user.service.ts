import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Users } from 'src/app/service/user/user';
import { CommonModule } from '@angular/common';

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
  return this.http.get("http://localhost:8080/user/all").pipe(
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

saveUser(user: Users){
  return this.http.post("http://localhost:8080/user/create",user).pipe(map(resp=>resp));
}

getUserByEmail(user_id: string){
  return this.http.get(`http://localhost:8080/user/${user_id}`)
  .pipe(map(resp=>resp));
}

updateUser(user: FormData) {
    return this.http
      .put(`http://localhost:8080/user/update`, user)
      .pipe(map((resp) => resp));
  }

}
