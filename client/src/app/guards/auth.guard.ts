import {
  CanActivateFn,
  MaybeAsync,
  Router,
  GuardResult,
} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';
// import { map, of, catchError, tap } from 'rxjs';

export const AuthGuard: CanActivateFn = (): MaybeAsync<GuardResult> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;

  // return authService.restoreAuthState().pipe(
  //   catchError(() => {
  //     console.log("result:");
  //     router.navigate(['/auth/login']);
  //     return of(false);
  //   }),
  //   tap((res) => {
  //     console.log("res", res);
  //   }),
  //   map((user) => {
  //     if (user) {
  //       return true;
  //     } else {
  //       router.navigate(['/auth/login'])
  //       return false;
  //     }
  //   }),
  //   catchError(() => {
  //     console.log("result:");
  //     router.navigate(['/auth/login']);
  //     return of(false);
  //   })
  // );
};
