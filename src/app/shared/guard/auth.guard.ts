import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthenticationService) {}

    canActivate() {
        if (this.authService.isLoggedin()) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
