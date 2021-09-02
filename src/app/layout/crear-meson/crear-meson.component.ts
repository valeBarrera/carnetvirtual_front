import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MesonService } from './meson.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-crear-meson',
  templateUrl: './crear-meson.component.html',
  styleUrls: ['./crear-meson.component.css'],
  animations: [routerTransition()]
})
export class CrearMesonComponent implements OnInit {

  registerForm: FormGroup;
  @ViewChild("fecha_nac") fecha_nac: ElementRef;

  submit: boolean = false;
  error: boolean = false;
  success: boolean = false;
  info: string = '';
  errores: any;

  objectKeys = Object.keys;

  cargos: string[] = [
      'Administrador',
      'Secretaria/o',
      'Telefonista'
  ]

  constructor(private service: MesonService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
        {
            username: [null, [Validators.required, Validators.minLength(6)]],
            email: [null, [Validators.required, Validators.email]],
            telefono: [null, [Validators.required, Validators.pattern('\\d{8}')]],
            fecha_nacimiento: [null, [Validators.required, Validators.maxLength(12)]],
            nombres: [null, [Validators.required, Validators.maxLength(60)]],
            apellidos: [null, [Validators.required, Validators.maxLength(60)]],
            cargo: [this.cargos[0], [Validators.required, Validators.maxLength(20)]],
            run: [null, [Validators.required, Validators.pattern('\\d{7,8}')]],
        }
    );
  }

  reset(): void {
      this.registerForm.reset();
      this.fecha_nac.nativeElement.value = null;
      this.registerForm.controls.cargo.setValue(this.cargos[0]);
      this.submit = false;
  }

  submitForm(): void {
    this.error = false;
    this.success = false;
    this.submit = true;
    let fecha: string = this.registerForm.controls.fecha_nacimiento.value;
    fecha = fecha.split('-')[2] + '-' + fecha.split('-')[1] + '-' +fecha.split('-')[0];
    let datos: any = this.registerForm.value;
    datos.fecha_nacimiento = fecha;
    if(this.registerForm.valid){
        this.service.registrarMeson(datos).subscribe((data: any) => {
            if(data.code == 200){
                this.info = data.mensaje;
                this.success = true;
                this.reset();
            }else{
                this.info = data.mensaje;
                this.errores = data.errores;
                this.error = true;
            }
        });
    }
  }

}
