import { Usuario } from './../../shared/model/usuario';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Medico } from './../../shared/model/medico';
import { CitaService } from './../gestionar-cita/cita.service';
import { Paciente } from './../../shared/model/paciente';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css'],
  animations: [routerTransition()]
})
export class CrearCitaComponent implements OnInit {

  buscar: FormGroup;
  citaForm: FormGroup;

  @ViewChild("fecha") fecha_: ElementRef;
  @ViewChild("hora") hora: ElementRef;

  med_seleccionado: boolean = false;
  medico: Medico = null;

  isReaderEnable: boolean = false;
  hasError: boolean = false;
  infoError: string = '';
  paciente: Paciente = null;

  dtOptions: DataTables.Settings = {};

  medicos: Medico[] = [];

  submit: boolean = false;
  submitCita: boolean = false;
  success: boolean = false;
  info: string = '';

  currentUser: Usuario;
  ROL_MESON: number = 2;
  ROL_MEDICO: number = 4;

  estados: string[] = ['Activa'];
  constructor(private service: CitaService, private formBuilder: FormBuilder, private authService: AuthenticationService) {
    this.currentUser = this.authService.currentUserValue;

    this.buscar = this.formBuilder.group({
        run: [null, [Validators.required, Validators.pattern('\\d{7,8}')]],
    });

    this.citaForm = this.formBuilder.group({
        estado: [null, [Validators.required]],
        paciente_id: [null, [Validators.required]],
        medico_id: [null, [Validators.required]],
        hora: [null, [Validators.required]],
        fecha: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    if(this.currentUser.rol_id == this.ROL_MESON){
        this.service.obtenerMedicos().subscribe((response:any) => {
            if(response.code == 200){
                this.medicos = response.medicos;
            }
        });
    }

    this.citaForm.controls.estado.setValue(this.estados[0]);

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

  seleccionarMedico(medico): void {
    this.medico = medico;
    this.med_seleccionado = true;
  }

  elegirOtroMedico(): void {
    this.medico = null;
    this.med_seleccionado = false;
  }

  buscarOtro(): void {
    this.paciente = null;
    this.buscar.reset();
    this.medico = null;
    this.med_seleccionado = false;
  }

  onSubmitCita(): void {
    this.hasError = false;
    this.submitCita = true;
    this.success = false;
    this.citaForm.controls.medico_id.setValue(this.medico.id);
    let fecha: string = this.citaForm.controls.fecha.value;
    fecha = fecha.split('-')[2] + '-' + fecha.split('-')[1] + '-' +fecha.split('-')[0];
    let datos: any = this.citaForm.value;
    datos.fecha = fecha;
    console.log(this.citaForm.value);
    if(this.citaForm.valid){
        this.service.registrarCita(datos).subscribe((response: any)=>{
            if(response.code == 200){
                this.info = response.mensaje;
                this.success = true;
                this.submitCita = false;
                this.citaForm.reset();
                this.fecha_.nativeElement.value = null;
                this.hora.nativeElement.value = null;
                this.citaForm.controls.paciente_id.setValue(this.paciente.id);
                this.citaForm.controls.estado.setValue(this.estados[0]);
            }else{
                this.hasError = true;
                this.infoError = response.mensaje;
            }
        });
    }else {
        console.log(this.citaForm.valid, this.citaForm.errors);
    }
  }

  onSubmit(): void {
    this.hasError = false;
    this.paciente = null;
    this.submit = true;
    if(this.buscar.valid){
        this.service.obtenerCitasByRun(this.buscar.value).subscribe((response:any) => {
            if(response.code == 200){
                this.paciente = response.paciente;
                this.submit = false;
                this.citaForm.controls.paciente_id.setValue(response.paciente.id);
                this.buscar.reset();
                this.isMedico();
            }else{
                this.hasError = true;
                this.infoError = response.mensaje;
            }
        });
    }
  }

  isMedico():void {
    if(this.currentUser.rol_id == this.ROL_MEDICO){
        this.med_seleccionado = true;
        this.medico = this.currentUser.medico;
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

      this.service.obtenerCitasById(data).subscribe((response:any) => {
        if(response.code == 200){
            this.paciente = response.paciente;
            this.citaForm.controls.estado.setValue(this.estados[0]);
            this.citaForm.controls.paciente_id.setValue(this.paciente.id);
            this.isMedico();
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
