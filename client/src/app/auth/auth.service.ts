import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User, UserAuth } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = `${environment.apiUrl}/auth/`;
  currentUser: UserAuth | null = null;

  constructor(private http: HttpClient) {}

  registerUser(signUpDto: SignUpDto): Observable<Response> {
    return this.http.post<Response>(this.apiUrl + 'register', signUpDto);
  }

  loginUser({ username, password }: SignInDto): Observable<User> {
    const response = this.http.post<User>(
      this.apiUrl + 'login',
      {
        username,
        password,
      },
      { withCredentials: true },
    );
    response.subscribe((res) => console.log(res));
    return response;
  }

  logoutUser(): Observable<User> {
    localStorage.removeItem('user');
    const response = this.http.post<User>(this.apiUrl + 'logout', null, {
      withCredentials: true,
    });
    this.currentUser = null;
    return response;
  }

  setCurrentUser(user: UserAuth) {
    this.currentUser = user;
  }

  isAuthenticated() {
    return this.currentUser ? true : false;
  }

  restoreAuthState(): Observable<UserAuth | null> {
    return this.http
      .get<UserAuth>(this.apiUrl + 'me', { withCredentials: true })
      .pipe(
        tap((user) => {
          this.currentUser = user;
          console.log(user);
        }),
        catchError(() => {
          this.currentUser = null;
          return of(null);
        }),
      );
  }

  refreshAccessToken(): Observable<UserAuth | null> {
    return this.http.post<UserAuth>(this.apiUrl + 'refresh', {
      withCredentials: true,
    })
    .pipe(
      tap((user) => {
        this.currentUser = user;
        console.log(user);
      }),
      catchError(() => {
        this.currentUser = null;
        return of(null);
      }),
    )
  }
}
