import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Environment } from 'src/app/environments/env';

interface CategoryResponse {
  categories: any[];
}

@Injectable({
  providedIn: 'root'
})

export class TourApiService {
  private toursSubject = new BehaviorSubject<any[]>([]);
  tours$ = this.toursSubject.asObservable();
  
  private baseUrl = Environment.baseUrl;

  constructor(private http: HttpClient) {}

  addTourCategory(categoryData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/tours/categories`, categoryData);
  }

  getTourCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.baseUrl}/admin/tours/categories`);
  }

  createTour(tourData: FormData) {
    return this.http.post(`${this.baseUrl}/admin/tours/create`, tourData)
  }

  getTours(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/tours/get`).pipe(
      tap((res: any) => this.toursSubject.next(res.tours))
    )
  }

  deleteTour(id:string){
    return this.http.delete(`${this.baseUrl}/admin/tours/delete/${id}`).pipe(
      tap(() => {
        const currentTours = this.toursSubject.value
        const updatedTours = currentTours.filter(tour => tour._id != id)
        this.toursSubject.next(updatedTours)
      })
    )
  }
}