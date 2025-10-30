import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

type AuthResponse = Response & {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = '';
  apiUrl: string = 'http://localhost:3000/auth/';

  constructor(private http: HttpClient) {}

  registerUser({ username, email, password }: SignUpDto): Observable<Response> {
    const newUser = {
      username, email, password, createdAt: new Date()
    }
    return this.http.post<Response>(this.apiUrl + 'register', newUser);
  }

  loginUser({ username, password }: SignInDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl + 'login', {
      username,
      password,
    });
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public getToken(): string {
    return this.token;
  }
}
