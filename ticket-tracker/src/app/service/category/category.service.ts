import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


  showTicketCategories() {
    return this.http
      .get('http://localhost:8080/category/all')
      .pipe(map((resp) => resp));
  }
}
