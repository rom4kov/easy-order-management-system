import {
  CanActivateFn,
  MaybeAsync,
  Router,
  GuardResult,
} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';
import { map, of, catchError, tap } from 'rxjs';

export const AuthGuard: CanActivateFn = (): MaybeAsync<GuardResult> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.restoreAuthState().pipe(
    map(user => {
      if (user) {
        return true;
      } else {
        router.navigate(['/auth/login'])
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/auth/login']);
      return of(false);
    })
  );
};
