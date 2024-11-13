import { HttpClient, HttpParams } from "@angular/common/http";
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
    return this.http.get(`${this.baseUrl}/user/tours/${id}`).pipe(
      map((res: any) => res.tour),
      tap(tour => this.tourDetailsSubject.next(tour)),
      catchError(error => {
        console.error('Error fetching tour details:', error);
        return throwError(() => error);
      })
    );
  }

  getAllTours(page: number = 1):Observable<any> {
    return this.http.get(`${this.baseUrl}/user/tours/all?page=${page}`)
  }

  getFilteredTrips(destination?:string, tripType?:string): Observable<any> {
    let params = new HttpParams()

    if (destination) {
      params = params.set('destination', destination);
    }
    if (tripType) {
      params = params.set('tripType', tripType);
    }
    return this.http.get(`${this.baseUrl}/user/tours/filter`, { params })
  }
}