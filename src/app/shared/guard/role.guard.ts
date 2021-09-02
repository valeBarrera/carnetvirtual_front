import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let url: string = state.url;
        return this.checkUserLogin(route, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.isLoggedin()) {
        const userRole = this.authService.getRole();
        if (route.data.hasOwnProperty('role') && route.data.hasOwnProperty('type') && !this.checkRole(route.data.role, userRole.nombre) && route.data.type.indexOf(userRole.cargo) === -1) {
            this.router.navigate(['/dashboard']);
            return false;
        } else if(route.data.hasOwnProperty('role') && !route.data.hasOwnProperty('type') && !this.checkRole(route.data.role, userRole.nombre)){
            this.router.navigate(['/dashboard']);
            return false;
        }
        return true;
    }

    this.router.navigate(['/dashboard']);
    return false;
  }

  checkRole(roles: string[], rol: string): boolean{
      return roles.includes(rol);
  }

}
