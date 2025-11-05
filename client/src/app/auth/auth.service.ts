import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = `${environment.apiUrl}/auth/`;
  currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  registerUser({ username, email, password }: SignUpDto): Observable<Response> {
    const newUser = {
      username,
      email,
      password,
      createdAt: new Date(),
    };
    return this.http.post<Response>(this.apiUrl + 'register', newUser);
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
    return response;
  }

  logoutUser(): Observable<User> {
    const response = this.http.post<User>(this.apiUrl + 'logout', null, {
      withCredentials: true,
    });
    this.currentUser = null;
    return response;
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  isAuthenticated() {
    return this.currentUser ? true : false;
  }

  restoreAuthState(): Observable<User | null> {
    return this.http.get<User>(this.apiUrl + 'me', { withCredentials: true }).pipe(
      tap((user) => (this.currentUser = user)),
      catchError(() => {
        this.currentUser = null;
        return of(null);
      })
    );
  };
}
