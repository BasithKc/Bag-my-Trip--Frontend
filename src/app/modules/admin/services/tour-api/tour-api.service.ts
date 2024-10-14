import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourApiService {
  private baseUrl = 'http://localhost:5000/admin/tours';

  constructor(private http: HttpClient) {}

  addTourCategory(categoryData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories`, categoryData);
  }

  getTourCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }
}