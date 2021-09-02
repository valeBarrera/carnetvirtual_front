import { Usuario } from './../../../shared/model/usuario';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;

    currentUser: Usuario;
    nombreCompleto: string;
    rol: string;

    ROL_MESON: number = 2;
    ROL_FARMACIA: number = 3;
    ROL_MEDICO: number = 4;

    constructor(private translate: TranslateService, private router: Router,
    private authenticationService: AuthenticationService) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });

        this.authenticationService.currentUser.subscribe(
            (x) => {
                this.currentUser = x;
                if(x != null){
                    switch (this.currentUser.rol_id) {
                        case this.ROL_MESON:
                            this.nombreCompleto = this.currentUser.meson.nombres + ' ' + this.currentUser.meson.apellidos;
                            this.rol = this.currentUser.rol.nombre + ' - ' + this.currentUser.meson.cargo;
                            break;

                        case this.ROL_FARMACIA:
                            this.nombreCompleto = this.currentUser.farmacia.nombres + ' ' + this.currentUser.farmacia.apellidos;
                            this.rol = this.currentUser.rol.nombre + ' - ' + this.currentUser.farmacia.cargo;
                            break;

                        case this.ROL_MEDICO:
                            this.nombreCompleto = this.currentUser.medico.nombres + ' ' + this.currentUser.medico.apellidos;
                            this.rol = this.currentUser.rol.nombre + ' - ' + this.currentUser.medico.especialidad;
                            break;
                    }
                }
            }
        );

    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
