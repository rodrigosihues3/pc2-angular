import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Permite el acceso a la ruta
  } else {
    // Si no está logueado, redirige a la página de login
    router.navigate(['/iniciar-sesion']);
    return true; // Bloquea el acceso a la ruta
  }
};
