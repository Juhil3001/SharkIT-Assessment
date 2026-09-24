import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export const SESSION_KEY = 'sharkit_session';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(email: string, password: string): Observable<{ ok: boolean }> {
    return this.http
      .post<{ ok: boolean }>(`${environment.apiUrl}/api/login`, { email, password })
      .pipe(tap(() => this.setSession()));
  }

  setSession(): void {
    localStorage.setItem(SESSION_KEY, 'true');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(SESSION_KEY) === 'true';
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    this.router.navigate(['/login']);
  }
}
