import { Usuario } from './../shared/model/usuario';
import { AuthenticationService } from './../shared/services/authentication.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.scss'],
  animations: [routerTransition()]
})
export class CambiarPasswordComponent implements OnInit {

    changeForm: FormGroup;

    ROL_MESON: number = 2;
    ROL_FARMACIA: number = 3;
    ROL_MEDICO: number = 4;

    currentUser: Usuario;
    nombre: string;

    submit: boolean = false;
    error: boolean = false;
    info: string = '';

    constructor(private router: Router, private wsLogin: AuthenticationService, private formBuilder: FormBuilder) {
        this.currentUser = wsLogin.currentUserValue;
        switch (this.currentUser.rol_id) {
            case this.ROL_MESON:
                this.nombre = this.currentUser.meson.nombres + ' ' + this.currentUser.meson.apellidos;
                break;

            case this.ROL_FARMACIA:
                this.nombre = this.currentUser.farmacia.nombres + ' ' + this.currentUser.farmacia.apellidos;
                break;

            case this.ROL_MEDICO:
                this.nombre = this.currentUser.medico.nombres + ' ' + this.currentUser.medico.apellidos;
                break;
        }
    }

    ngOnInit() {
        this.changeForm = this.formBuilder.group(
            {
                password: [null, [Validators.required, Validators.pattern('^[a-zA-Z\\d]{6,12}$')]],
                password_confirmation: [null, [Validators.required, Validators.pattern('^[a-zA-Z\\d]{6,12}$')]]
            }
        );
    }

    onChangePassword() {
        this.error = false;

        if (!this.changeForm.valid) {
            this.submit = true;
            return;
        }

        this.wsLogin.changePassword(this.changeForm.value).subscribe((response: any) => {
            this.submit = false;
            if(response.status != 'error'){
                this.router.navigate(['/dashboard']);
            } else {
                this.error = true;
                this.info = response.mensaje;
            }
        });

    }

}
