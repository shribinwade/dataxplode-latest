import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    debugger
    if (this.authService.isLoggedIn() && this.authService.getUserInfo()?.role === 'admin') {
      return true;
    } else {
      this.router.navigate(['dashboard/user/home']); // Redirect to user dashboard if not admin
      return false;
    }
  }
}
