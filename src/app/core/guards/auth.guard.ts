import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return authService.isAuthenticated().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        // Redirect to login with return URL
        router.navigate(['/sign-in'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/sign-in']);
      return of(false);
    })
  );
};
