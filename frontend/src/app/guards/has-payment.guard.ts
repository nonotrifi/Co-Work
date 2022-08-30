import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HasPaymentGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const hasPayment = await this.authService.hasPayment();
    const isAdmin = await this.authService.isAdmin();
    if(isAdmin){
      this.router.navigate(['/']);
    }
    if (!hasPayment) {
      this.router.navigate(['/payment']);
    }
    return hasPayment;
  }
}
