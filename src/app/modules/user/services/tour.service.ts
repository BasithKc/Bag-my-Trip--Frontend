import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Environment } from "src/app/environments/env";

@Injectable({
  providedIn: 'root'
})

export class TourService {
  private tourDetailsSubject = new BehaviorSubject<any>(null)
  tourDetails$ = this.tourDetailsSubject.asObservable();

  private baseUrl = Environment.baseUrl

  constructor(private http: HttpClient) {}

  getTourDetails(id:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/tours/${id}`).pipe(
      tap((res: any) => this.tourDetailsSubject.next(res.tour))
    )
  }

  getAllTours():Observable<any> {
    return this.http.get(`${this.baseUrl}/user/tours/all`)
  }
}