import { Usuario } from './../../shared/model/usuario';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Receta } from './../../shared/model/receta';
import { RecetaService } from './receta.service';
import { Paciente } from './../../shared/model/paciente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-obtener-receta',
  templateUrl: './obtener-receta.component.html',
  styleUrls: ['./obtener-receta.component.css'],
  animations: [routerTransition()]
})
export class ObtenerRecetaComponent implements OnInit {
  buscar: FormGroup;
  surtirForm: FormGroup;
  recetaForm: FormGroup;

  dtOptions: DataTables.Settings = {};

  isReaderEnable: boolean = false;
  hasError: boolean = false;
  infoError: string = '';
  paciente: Paciente = null;
  recetas: Receta[] = [];

  ROL_MESON: number = 2;
  ROL_FARMACIA: number = 3;
  ROL_MEDICO: number = 4;

  submitRegistro: boolean = false;
  success: boolean = false;
  info: string = '';

  estados: string[] = ['Activa', 'No Activa', 'Caducada'];

  currentUser: Usuario = null;

  currentReceta: Receta = null;

  submit: boolean = false;

  constructor(private service: RecetaService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private authService: AuthenticationService) {
    this.buscar = this.formBuilder.group(
        {
            run: [null, [Validators.required, Validators.pattern('\\d{7,8}')]],
        }
    );
    this.recetaForm = this.formBuilder.group({
        id: [null, [Validators.required]],
        prescripcion: [null, [Validators.required]],
        indicaciones: [null, [Validators.required]],
        estado: [null, [Validators.required]]
    });
    this.surtirForm = this.formBuilder.group({
        id: [null, []],
        proximo_retiro: [null, []]
    });
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.recetaForm.controls.estado.setValue(this.estados[0]);
    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        language: {
                emptyTable: '',
                zeroRecords: 'No hay coincidencias',
                lengthMenu: 'Mostrar _MENU_ elementos',
                search: 'Buscar:',
                info: 'De _START_ a _END_ de _TOTAL_ elementos',
                infoEmpty: 'De 0 a 0 de 0 elementos',
                infoFiltered: '(filtrados de _MAX_ elementos totales)',
                paginate: {
                first: 'Prim.',
                last: 'Últ.',
                next: 'Sig.',
                previous: 'Ant.'
            },
        },
    };
  }

  initSurtir(receta: Receta, modal): void {
    this.currentReceta = receta;
    this.modalService.open(modal, {ariaLabelledBy: 'modalRecetaLabel', centered: true, size: 'lg'});
  }

  onSubmitSurtir(): void {
    this.hasError = false;
    this.success = false;


    let fecha: string = this.surtirForm.controls.proximo_retiro.value;
    fecha = fecha.split('-')[2] + '-' + fecha.split('-')[1] + '-' +fecha.split('-')[0];
    let datos: any = this.surtirForm.value;
    datos.proximo_retiro = fecha;
    datos.id = this.currentReceta.id;

    this.service.surtirRecetas(datos).subscribe((response:any) => {
            this.modalService.dismissAll();
            this.currentReceta = null;
            if(response.code == 200){
                this.info = response.mensaje;
                this.success = true;
                this.recetas = response.recetas;
            }else{
                this.hasError = true;
                this.infoError = response.mensaje;
            }
        });
  }

  onSubmitRegistro(): void {
    this.hasError = false;
    this.submitRegistro = true;
    this.success = false;
    this.modalService.dismissAll();
    if(this.recetaForm.valid){
        this.service.modificarRecetas(this.recetaForm.value).subscribe((response:any) => {
            if(response.code == 200){
                this.currentReceta = null;
                this.info = response.mensaje;
                this.success = true;
                this.submitRegistro = false;
                this.recetas = response.recetas;
                this.recetaForm.reset();
            }else{
                this.hasError = true;
                this.infoError = response.mensaje;
            }
        });
    }
  }

  initModificarReceta(receta: Receta, modal): void {
    this.currentReceta = receta;
    this.recetaForm.controls.id.setValue(receta.id);
    this.recetaForm.controls.estado.setValue(receta.estado);
    this.recetaForm.controls.indicaciones.setValue(receta.indicaciones);
    this.recetaForm.controls.prescripcion.setValue(receta.prescripcion);
    this.modalService.open(modal, {ariaLabelledBy: 'modalRecetaLabel', centered: true, size: 'lg'});
  }

  buscarOtro(): void {
      this.paciente = null;
      this.recetas = [];
      this.buscar.reset();
  }

  onSubmit(): void {
    this.hasError = false;
    this.paciente = null;
    this.recetas = [];
    this.submit = true;
    if(this.buscar.valid){
        this.service.obtenerRecetasByRun(this.buscar.value).subscribe((response:any) => {
            if(response.code == 200){
                this.paciente = response.paciente;
                this.recetas = response.recetas;
                this.buscar.reset();
            }else{
                this.hasError = true;
                this.infoError = response.mensaje;
            }
        })
    }
  }

  onRead(id_usuario: number) {
      this.changeStateReader();
      this.recetas = [];
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
            this.recetas = response.recetas;
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
