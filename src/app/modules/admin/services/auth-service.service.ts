import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http"
import { Observable, tap } from 'rxjs';


interface SignInCredentials {
  userName: string,
  password: string
}

interface SignInResponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:5000/admin/auth'

  constructor(private http: HttpClient) { }

  signin(credentials: SignInCredentials) :Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.apiUrl}/signin`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('authToken', response.token)
        })
      )
  }
}
