import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

interface LoginResponse {
  success: boolean;
  fullname: string;
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/v1/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}
  signup(fullname: string, email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/sign-up`,
        { fullname, email, password },
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          console.log('API Response:', response);
          // this.currentUserSubject.next(response.user);
         
        })
      );
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/sign-in`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          console.log('API Response:', response);
          // this.currentUserSubject.next(response.user);
          localStorage.setItem('auth_token', response.token);
        })
      );
  }
  isAuthenticated(): Observable<boolean> {
    return this.http
      .get<{ authenticated: boolean }>(`${this.apiUrl}/auth-status`, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => console.log('Authentication check:', response)),
        map((response) => response.authenticated)
      );
  }
  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/sign-out`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          localStorage.removeItem('auth_token');
          // this.currentUserSubject.next(null);
        })
      );
  }
}
