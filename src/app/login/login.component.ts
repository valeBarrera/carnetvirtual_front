import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    submit: boolean = false;
    error: boolean = false;
    info: string = '';

    constructor(private router: Router, private wsLogin: AuthenticationService, private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group(
            {
                username: [null, [Validators.required]],
                password: [null, Validators.required]
            }
        );
    }

    onLoggedin() {
        this.error = false;
        if (!this.loginForm.valid) {
            this.submit = true;
            return;
        }

        this.wsLogin.login(this.loginForm.value).subscribe((response: any) => {
            this.submit = false;
            if(response.status != 'error'){
                if(response.usuario.change_password){
                    this.router.navigate(['/change-password']);
                }else{
                    this.router.navigate(['/dashboard']);
                }
            } else {
                this.error = true;
                this.info = response.mensaje;
            }
        });

    }
}
