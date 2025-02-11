import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http"
import { Observable, tap } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { Environment } from 'src/app/environments/env';

interface DecodedToken {
  userId: string;
  exp: number;
}

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
  private apiUrl = Environment.baseUrl

  constructor(private http: HttpClient) { }

  signin(credentials: SignInCredentials) :Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.apiUrl}/admin/auth/signin`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('authToken', response.token)
        })
      )
  }

  isAuthenticated () {   
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    const decoded = this.getDecodedToken();
    
    if (!decoded) return false;
    return decoded?.exp > Date.now() / 1000;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private getDecodedToken(): DecodedToken | null{
    const token = this.getToken();
    if (token) {
      try {        
        return jwtDecode(token) as DecodedToken
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    }
    return null;
  }
}


