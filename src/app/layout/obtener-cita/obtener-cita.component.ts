import { Cita } from './../../shared/model/cita';
import { Medico } from './../../shared/model/medico';
import { CitaService } from './../gestionar-cita/cita.service';
import { Usuario } from './../../shared/model/usuario';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Paciente } from './../../shared/model/paciente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-obtener-cita',
  templateUrl: './obtener-cita.component.html',
  styleUrls: ['./obtener-cita.component.css'],
  animations: [routerTransition()]
})
export class ObtenerCitaComponent implements OnInit {

  buscar: FormGroup;

  dtOptions: DataTables.Settings = {};

  isReaderEnable: boolean = false;
  hasError: boolean = false;
  infoError: string = '';
  paciente: Paciente = null;
  citas: Cita[] = [];
  currentCita: Cita;

  accion: string = '';

  ROL_MESON: number = 2;
  ROL_FARMACIA: number = 3;
  ROL_MEDICO: number = 4;

  submitRegistro: boolean = false;
  success: boolean = false;
  info: string = '';

  medicos: Medico[] = [];

  estados: string[] = ['Activa', 'No Activa', 'Caducada', 'Con Incidencia'];

  currentUser: Usuario = null;

  submit: boolean = false;

  constructor(private service: CitaService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private authService: AuthenticationService) {
    this.buscar = this.formBuilder.group(
        {
            run: [null, [Validators.required, Validators.pattern('\\d{7,8}')]],
        }
    );

    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    if(this.currentUser.rol_id == this.ROL_MESON){
        this.service.obtenerMedicos().subscribe((response:any) => {
            if(response.code == 200){
                this.medicos = response.medicos;
            }
        });
    }

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

  accionCita(): void {
    this.hasError = false;
    this.modalService.dismissAll();
    if(this.accion == 'Cancelar'){
        this.service.cancelarCita({id: this.currentCita.id}).subscribe((response: any) => {
            this.modalService.dismissAll();
            if(response.code == 200){
                this.citas = response.citas;
            }else{
                this.hasError = true;
                this.infoError = response.mensaje;
            }
        });
    }

    if(this.accion == 'Notificar'){
        this.service.notificarCita({id: this.currentCita.id}).subscribe((response: any) => {

            if(response.code == 200){
                this.citas = response.citas;
            }else{
                this.hasError = true;
                this.infoError = response.mensaje;
            }
        });
    }
  }

  cancelar(cita, modal): void {
    this.accion = 'Cancelar';
    this.currentCita = cita;
    this.modalService.open(modal, {ariaLabelledBy: 'modalCitaLabel', centered: true, size: 'lg'});
  }

  notificar(cita, modal): void {
    this.accion = 'Notificar';
    this.currentCita = cita;
    this.modalService.open(modal, {ariaLabelledBy: 'modalCitaLabel', centered: true, size: 'lg'});
  }

  buscarOtro(): void {
      this.paciente = null;
      this.citas = [];
      this.buscar.reset();
  }

  onSubmit(): void {
    this.hasError = false;
    this.paciente = null;
    this.citas = [];
    this.submit = true;
    if(this.buscar.valid){
        this.service.obtenerCitasByRun(this.buscar.value).subscribe((response:any) => {
            if(response.code == 200){
                this.paciente = response.paciente;
                this.citas = response.citas;
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
      this.citas = [];
      this.hasError = false;
      this.paciente = null;
      if(id_usuario <= 0){
        this.hasError = true;
        this.infoError = 'Ha ocurrido un error en la lectura del Carnet Virtual.';
        return;
      }

      let data: any = {id_usuario: id_usuario};

      this.service.obtenerCitasById(data).subscribe((response:any) => {
        if(response.code == 200){
            this.paciente = response.paciente;
            this.citas = response.citas;
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
