import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";
import { Environment } from "src/app/environments/env";

@Injectable({
  providedIn: 'root'
})

export class TourService {
  private tourDetailsSubject = new BehaviorSubject<any>(null)
  tourDetails$ = this.tourDetailsSubject.asObservable();

  private baseUrl = Environment.baseUrl

  constructor(private http: HttpClient) {}

  getTourDetails(id:any) {
    return this.http.get(`${this.baseUrl}/api/user/tours/${id}`).pipe(
      map((res: any) => res.tour),
      tap(tour => this.tourDetailsSubject.next(tour)),
      catchError(error => {
        console.error('Error fetching tour details:', error);
        return throwError(() => error);
      })
    );
  }

  getAllTours():Observable<any> {
    return this.http.get(`${this.baseUrl}/api/user/tours/all`)
  }

  submitDestination(destination:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/user/tours/filter?destination=${destination}`)
  }
}