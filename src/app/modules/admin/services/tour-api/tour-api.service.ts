import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CategoryResponse {
  categories: any[];
}

@Injectable({
  providedIn: 'root'
})

export class TourApiService {
  private baseUrl = 'http://localhost:5000/admin/tours';

  constructor(private http: HttpClient) {}

  addTourCategory(categoryData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories`, categoryData);
  }

  getTourCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.baseUrl}/categories`);
  }

  createTour(tourData: FormData) {
    return this.http.post(`${this.baseUrl}/create`, tourData)
  }
}