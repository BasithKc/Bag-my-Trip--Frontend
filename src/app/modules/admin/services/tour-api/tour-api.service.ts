import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

interface CategoryResponse {
  categories: any[];
}

@Injectable({
  providedIn: 'root'
})

export class TourApiService {
  private toursSubject = new BehaviorSubject<any[]>([]);
  tours$ = this.toursSubject.asObservable();
  
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

  getTours(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get`).pipe(
      tap((res: any) => this.toursSubject.next(res.tours))
    )
  }

  deleteTour(id:string){
    return this.http.delete(`${this.baseUrl}/delete/${id}`).pipe(
      tap(() => {
        const currentTours = this.toursSubject.value
        const updatedTours = currentTours.filter(tour => tour._id != id)
        this.toursSubject.next(updatedTours)
      })
    )
  }
}