import { Paciente } from './../../shared/model/paciente';
import { RecetaService } from './../obtener-receta/receta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';


@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.css'],
  animations: [routerTransition()]
})
export class CrearRecetaComponent implements OnInit {
  buscar: FormGroup;
  recetaForm: FormGroup;

  isReaderEnable: boolean = false;
  hasError: boolean = false;
  infoError: string = '';
  paciente: Paciente = null;
  submit: boolean = false;
  submitRegistro: boolean = false;
  success: boolean = false;
  info: string = '';

  estados: string[] = ['Activa', 'No Activa', 'Caducada'];

  constructor(private service: RecetaService, private formBuilder: FormBuilder) {
    this.buscar = this.formBuilder.group({
        run: [null, [Validators.required, Validators.pattern('\\d{7,8}')]],
    });
    this.recetaForm = this.formBuilder.group({
        prescripcion: [null, [Validators.required]],
        indicaciones: [null, [Validators.required]],
        paciente_id: [null, [Validators.required]],
        estado: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.recetaForm.controls.estado.setValue(this.estados[0]);
  }

  buscarOtro(): void {
      this.paciente = null;
      this.buscar.reset();
  }

  onSubmitRegistro(): void {
    this.hasError = false;
    this.submitRegistro = true;
    this.success = false;
    if(this.recetaForm.valid){
        this.service.registrarRecetas(this.recetaForm.value).subscribe((response:any) => {
            if(response.code == 200){
                this.info = response.mensaje;
                this.success = true;
                this.submitRegistro = false;
                this.recetaForm.reset();
                this.recetaForm.controls.paciente_id.setValue(this.paciente.id);
                this.recetaForm.controls.estado.setValue(this.estados[0]);
            }else{
                this.hasError = true;
                this.infoError = response.mensaje;
            }
        });
    }
  }

  onSubmit(): void {
    this.hasError = false;
    this.paciente = null;
    this.submit = true;
    if(this.buscar.valid){
        this.service.obtenerRecetasByRun(this.buscar.value).subscribe((response:any) => {
            if(response.code == 200){
                this.paciente = response.paciente;
                this.submit = false;
                this.recetaForm.controls.paciente_id.setValue(response.paciente.id);
                this.buscar.reset();
            }else{
                this.hasError = true;
                this.infoError = response.mensaje;
            }
        })
    }else{
        console.log(this.buscar.value, this.buscar.valid, this.buscar.errors);
    }
  }

  onRead(id_usuario: number) {
      this.changeStateReader();
      this.hasError = false;
      this.paciente = null;
      if(id_usuario <= 0){
        this.hasError = true;
        this.infoError = 'Ha ocurrido un error en la lectura del Carnet Virtual.';
        return;
      }

      let data: any = {id_usuario: id_usuario};

      this.service.obtenerRecetasById(data).subscribe((response:any) => {
        if(response.code == 200){
            this.paciente = response.paciente;
            this.recetaForm.controls.estado.setValue(this.estados[0]);
            this.recetaForm.controls.paciente_id.setValue(this.paciente.id);
        }else{
            this.hasError = true;
            this.infoError = response.mensaje;
        }
      });

  }

  changeStateReader(): void{
      this.hasError = false;
      this.isReaderEnable = !this.isReaderEnable;
  }

}
