import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Environment } from "src/app/environments/env";

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  private baseUrl = Environment.baseUrl

  constructor(private http: HttpClient) {}

  bookTour(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/book`, form)
  }
}