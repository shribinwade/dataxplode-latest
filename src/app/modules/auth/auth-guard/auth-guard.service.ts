import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Allow access if the user is authenticated
    } else {
      this.router.navigate(['auth/login']); // Redirect to login if not authenticated
      return false; // Prevent access to the route
    }
  }
}
