import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('tkn')) {
    return true; // Pušta korisnika na rutu
  } else {
    // Ako nije ulogovan, šalje ga na login stranicu
    router.navigate(['/login']);
    return false; // Blokira pristup ruti
  }
};