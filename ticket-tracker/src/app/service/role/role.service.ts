import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Roles } from './role';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roles: Roles[]=[];
  constructor(private http: HttpClient) { }

  getAllRoles(){
    return this.http.get("http://localhost:8080/role/all").pipe(
    map((response) => {
      var roles = [];
      for(const key in response){
        if(response.hasOwnProperty(key)){
          if(key==='data'){
            roles.push(...(response as any)[key]);
          }
        }
      }
      return roles;
    })
  );
  }

  saveRole(role: Roles){
    return this.http.post("http://localhost:8080/role/create",role).pipe(map(resp=>resp));
  }
  postRole(role:any){
    return this.http.post("http://localhost:8080/role/create",this.roles).pipe(map(resp=>resp));
  }
  addRole(){
    return this.http.post("http://localhost:8080/role/create",this.roles).pipe(map(resp=>resp));
  }
}
