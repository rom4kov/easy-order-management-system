import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import {
  BehaviorSubject,
  catchError,
  Observable,
  switchMap,
  take,
  filter,
  throwError,
} from 'rxjs';
import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { UserAuth } from '../models/user';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<any>(null);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
    });

    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.handle401Error(req, next);
        }
        return throwError(() => console.error(err));
      }),
    );
  }

  handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      console.log("shown")
      this.refreshTokenSubject.next(null);
      console.log("shown")

      return this.authService.refreshAccessToken().pipe(
        switchMap((user) => {
          console.log("not shown")
          this.isRefreshing = false;
          this.refreshTokenSubject.next(user);

          return next.handle(req);
        }),
        catchError((err) => {
          console.log("not shown")
          this.isRefreshing = false;
          this.router.navigate(['']);
          console.log("not shown");
          this.authService.logoutUser();
          return throwError(() => err);
        }),
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((user: UserAuth) => user != null),
        take(1),
        switchMap(() => next.handle(req)),
      );
    }
  }
}

export const authInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
