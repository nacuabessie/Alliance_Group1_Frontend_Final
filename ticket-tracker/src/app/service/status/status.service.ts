import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  showStatuses() {
    return this.http
      .get('http://localhost:8080/status/all')
      .pipe(map((resp) => resp));
  }

  getStatuses(){
    return this.http.get('http://localhost:8080/status/all');
  }
  
}
