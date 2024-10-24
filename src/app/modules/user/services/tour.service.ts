import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TourService {
  private tourDetailsSubject = new BehaviorSubject<any>(null)
  tourDetails$ = this.tourDetailsSubject.asObservable();

  private baseUrl = 'https://localhost/5000/user/tours'

  constructor(private http: HttpClient) {}

  getTourDetails(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      tap(detials => this.tourDetailsSubject.next(detials))
    )
  }
}