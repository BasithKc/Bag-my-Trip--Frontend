import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  private baseUrl = 'https://localhost/5000/user/book'

  constructor(private http: HttpClient) {}

  bookTour(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, form)
  }
}