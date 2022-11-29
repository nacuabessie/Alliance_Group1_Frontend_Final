import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Users } from 'src/app/service/user/user';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  users: Users[]=[];
  constructor(private http: HttpClient) { }
  
getAllUsers(){
  return this.http.get("http://localhost:8080/user/all").pipe(map(resp=>resp));
}

saveUser(user: Users){
  return this.http.post("http://localhost:8080/user/create",user).pipe(map(resp=>resp));
}

getUserByEmail(user_email: string){
  return this.http.get(`http://localhost:8080/user/${user_email}`)
  .pipe(map(resp=>resp));
}

postTicket(ticket:any){
  return this.http.post("http://localhost:8080/ticket/create",this.users).pipe(map(resp=>resp));
}
addTicket(){
  return this.http.post("http://localhost:8080/ticket/create",this.users).pipe(map(resp=>resp));
}

}
