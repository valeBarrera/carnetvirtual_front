import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './../../shared/model/usuario';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css'],
  animations: [routerTransition()]
})
export class ListarUsuariosComponent implements OnInit {
  modificarPacienteForm: FormGroup;
  modificarMedicoForm: FormGroup;
  modificarMesonForm: FormGroup;
  modificarFarmaciaForm: FormGroup;

  submitPaciente: boolean;
  submitMedico: boolean;
  submitMeson: boolean;
  submitFarmacia: boolean;

  fecha_nac_pac_val: string;
  fecha_nac_mes_val: string;
  fecha_nac_med_val: string;
  fecha_nac_far_val: string;

  success: boolean = false;
  hasError: boolean = false;

  info: string = '';
  infoError: string = '';

  usuarios: Usuario[] = [];
  usuario: Usuario;
  dtOptions: DataTables.Settings = {};

  currentAuthUser: Usuario;

  ROL_PACIENTE: number = 1;
  ROL_MESON: number = 2;
  ROL_FARMACIA: number = 3;
  ROL_MEDICO: number = 4;

  especialidades: string[] = [
    'ANESTESIOLOGIA',
    'ANGIOLOGIA',
    'ADMINISTRACION DE HOSPITALES',
    'ANATOMIA PATOLOGICA',
    'ANATOMIA HUMANA',
    'BIOQUIMICA',
    'CIRUGIA TORACICA Y CARDIOVASCULAR',
    'CARDIOLOGIA',
    'CIRUGIA GENERAL',
    'CIRUGIA DE CABEZA Y CUELLO Y MAXILO FACIAL',
    'CIRUGIA PEDIATRICA',
    'CIRUGIA PLASTICA Y REPARADORA',
    'DERMATOLOGIA',
    'ENDOCRINOLOGIA',
    'ENFERMEDADES INFECCIOSAS Y TROPICALES',
    'EMBRIOLOGIA',
    'EPIDEMIOLOGIA',
    'FISIOLOGIA',
    'FARMACOLOGIA',
    'GASTROENTEROLOGIA',
    'GINECOLOGIA Y OBSTETRICIA',
    'GERIATRIA',
    'GENETICA',
    'HEMATOLOGIA',
    'HISTOLOGIA',
    'INMUNOLOGIA Y ALERGIA',
    'MEDICINA NUCLEAR',
    'MEDICINA DEL TRABAJO',
    'MEDICINA INTERNA',
    'MEDICINA LEGAL',
    'MEDICINA FISICA Y REHABILITACION',
    'MEDICINA DEL DEPORTE',
    'NEFROLOGIA',
    'NEUMOLOGIA',
    'NEUROCIRUGIA',
    'NEUROLOGIA',
    'NUTRICION',
    'OFTALMOLOGIA',
    'ONCOLOGIA MEDICA',
    'ONCOLOGIA QUIRURGICA',
    'ORTOPEDIA Y TRAUMATOLOGIA',
    'OTORRINOLARINGOLOGIA',
    'PATOLOGIA CLINICA',
    'PEDIATRIA',
    'PSIQUIATRIA',
    'RADIOLOGIA',
    'RADIOTERAPIA',
    'REUMATOLOGIA',
    'SALUD PUBLICA',
    'UROLOGIA',
    'VENEREOLOGIA',
    'PROCTOLOGIA',
    'MEDICINA INTENSIVA',
    'MEDICINA OCUPACIONAL Y MEDIO AMBIENTE',
    'NEONATOLOGIA',
    'MEDICINA GENERAL INTEGRAL',
    'CIRUGIA GENERAL Y ONCOLOGICA',
    'MEDICINA GENERAL Y ONCOLOGICA',
    'INMUNOLOGIA Y REUMATOLOGIA',
    'NEUMOLOGIA PEDIATRICA',
    'MEDICINA DE EMERGENCIAS Y DESASTRES',
    'ADMINISTRACION DE SALUD',
    'MEDICINA FAMILIAR',
    'RADIODIAGNOSTICO',
    'LABORATORIO CLINICO',
    'NEFROLOGIA PEDIATRICA',
    'UROLOGIA GENERAL Y ONCOLOGICA',
    'PATOLOGIA Y LABORATORIO CLINICO',
    'PARASITOLOGIA',
    'CIRUGIA DE MANO',
    'CIRUGIA NEUMOLOGICA',
    'NEUROLOGIA PEDIATRICA',
    'HISTOPATOLOGIA',
    'ONCOLOGIA PEDIATRICA',
    'MEDICINA INTEGRAL Y GESTION EN SALUD',
    'GINECOLOGIA DE LA NIÑA Y ADOLESCENTE',
    'ANATOMIA PATOLOGICA - PATOLOGIA CLINICA',
    'ANESTESIOLOGIA Y TERAPIA INTENSIVA CARDIOVASCULAR',
    'LABORATORIO CLINICO Y ANATOMIA PATOLOGICA',
    'MEDICINA INTENSIVA PEDIATRICA',
    'ENDOCRINOLOGIA PEDIATRICA Y GENETICA',
    'PSIQUIATRIA INFANTIL',
    'PATOLOGIA ONCOLOGICA',
    'INFECTOLOGIA PEDIATRICA',
    'GINECOLOGIA ONCOLOGICA',
    'GASTROENTEROLOGIA PEDIATRICA',
    'CIRUGIA CARDIOVASCULAR PEDIATRICA',
    'OFTALMOLOGIA ONCOLOGICA',
    'ADOLESCENTOLOGIA',
    'PATOLOGIA',
    'ENDOCRINOLOGIA PEDIATRICA',
    'CIRUGIA ONCOLOGICA DE CABEZA Y CUELLO',
    'CIRUGIA ONCOLOGICA DE MAMAS, TEJIDOS BLANDOS Y PIEL',
    'MEDICINA HIPERBARICA Y SUBACUATICA',
    'CIRUGIA VASCULAR Y ANGIOLOGIA',
    'CIRUGIA GASTROENTEROLOGICA',
    'CIRUGIA ORTOPEDICA Y TRAUMATOLOGIA',
    'CIRUGIA ONCOLOGICA',
    'INMUNOLOGIA CLINICA Y ALERGOLOGIA',
    'OFTALMOLOGIA PEDIATRICA Y ESTRABISMO',
    'DERMATOLOGIA Y VENEREOLOGIA',
    'CARDIOLOGIA INFANTIL',
    'CIRUGIA DEL APARATO DIGESTIVO',
    'UROLOGIA PEDIATRICA',
    'ANESTESIOLOGIA OBSTETRICA',
    'CIRUGIA CARDIOVASCULAR',
    'ANALISIS CLINICOS',
    'EPIDEMIOLOGIA DE CAMPO',
    'PEDIATRIA DE EMERGENCIAS Y DESASTRES',
    'RADIOLOGIA INTERVENCIONISTA',
    'ARTROSCOPIA Y CIRUGIA DE RODILLA',
    'TERAPIA INTENSIVA',
    'CIRUGIA ONCOLOGICA ABDOMINAL',
    'CIRUGIA CRANEOMAXILOFACIAL',
    'MEDICINA DE REHABILITACION',
    'MEDICINA INTERNA PEDIATRICA',
    'MEDICINA INTERNA - GASTROENTEROLOGIA',
    'HEMATOLOGIA Y HEMOTERAPIA',
    'CIRUGIA, TRANSPLANTOLOGIA Y ANDROLOGIA',
    'NEUROFISIOLOGIA CLINICA',
    'TOXICOLOGIA',
    'RADIOLOGIA E IMAGEN',
    'MEDICINA AEROESPACIAL',
    'HEMATOLOGIA PEDIATRICA',
    'HEMATOLOGIA Y HEMOTERAPIA',
    'ANESTESIA, ANALGESIA Y REANIMACION',
    'MEDICINA INTERNA Y PEDIATRIA',
    'ENDOCRINOLOGIA Y NUTRICION',
    'APARATO DIGESTIVO',
    'DIAGNOSTICO POR IMAGENES',
    'GESTION EN SALUD',
    'CIRUGIA PLASTICA Y REPARADORA DE MANO',
    'ONCOLOGIA RADIOTERAPICA',
    'ALERGOLOGIA',
    'MEDICINA INTENSIVA Y DE EMERGENCIA'
  ];

  cargosMeson: string[] = [
      'Administrador',
      'Secretaria/o',
      'Telefonista'
  ];

  cargosFarmacia: string[] = [
      'Químico Farmacéutico',
      'Farmacéutico',
      'Auxiliar'
  ]



  constructor(private service: UsuariosService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private authService: AuthenticationService) {
    this.currentAuthUser = authService.currentUserValue;

    this.modificarFarmaciaForm = this.formBuilder.group(
        {
            id: [null, []],
            username: [null, [Validators.required, Validators.minLength(6)]],
            email: [null, [Validators.required, Validators.email]],
            telefono: [null, [Validators.required, Validators.pattern('\\d{8}')]],
            fecha_nacimiento: [null, [Validators.required, Validators.maxLength(12)]],
            nombres: [null, [Validators.required, Validators.maxLength(60)]],
            apellidos: [null, [Validators.required, Validators.maxLength(60)]],
            cargo: [null, [Validators.required, Validators.maxLength(20)]],
            run: [null, [Validators.required, Validators.pattern('\\d{7,8}')]],
        }
    );
    this.modificarMedicoForm = this.formBuilder.group(
        {
            id: [null, []],
            username: [null, [Validators.required, Validators.minLength(6)]],
            email: [null, [Validators.required, Validators.email]],
            telefono: [null, [Validators.required, Validators.pattern('\\d{8}')]],
            fecha_nacimiento: [null, [Validators.required, Validators.maxLength(12)]],
            nombres: [null, [Validators.required, Validators.maxLength(60)]],
            apellidos: [null, [Validators.required, Validators.maxLength(60)]],
            especialidad: [null, [Validators.required, Validators.maxLength(20)]],
            run: [null, [Validators.required, Validators.pattern('\\d{7,8}')]],
        }
    );
    this.modificarMesonForm = this.formBuilder.group(
        {
            id: [null, []],
            username: [null, [Validators.required, Validators.minLength(6)]],
            email: [null, [Validators.required, Validators.email]],
            telefono: [null, [Validators.required, Validators.pattern('\\d{8}')]],
            fecha_nacimiento: [null, [Validators.required, Validators.maxLength(12)]],
            nombres: [null, [Validators.required, Validators.maxLength(60)]],
            apellidos: [null, [Validators.required, Validators.maxLength(60)]],
            cargo: [null, [Validators.required, Validators.maxLength(20)]],
            run: [null, [Validators.required, Validators.pattern('\\d{7,8}')]],
        }
    );
    this.modificarPacienteForm = this.formBuilder.group(
        {
            id: [null, []],
            username: [null, [Validators.required, Validators.minLength(6)]],
            email: [null, [Validators.required, Validators.email]],
            telefono: [null, [Validators.required, Validators.pattern('\\d{8}')]],
            fecha_nacimiento: [null, [Validators.required, Validators.maxLength(12)]],
            nombres: [null, [Validators.required, Validators.maxLength(60)]],
            apellidos: [null, [Validators.required, Validators.maxLength(60)]],
            run: [null, [Validators.required, Validators.pattern('\\d{7,8}')]],
        }
    );

  }

  ngOnInit(): void {
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

    this.service.listaUsuarios().subscribe((data: any) => {
        this.usuarios = data.usuarios;
    });

  }

  printer() {
    let styles = '<style>body{margin:0;font-family:"Open Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";font-size:1rem;font-weight:400;line-height:1.5;color:#212529;text-align:left;background-color:#fff}.row{display: flex;flex-wrap: wrap;margin-right: -15px;margin-left: -15px;} .col-6{flex:0 0 50%;max-width:50%}';
    styles += ' h4, .h4 {font-size: 1.5rem; margin-block-start: 0.5em; margin-block-end: 0.5em;} .card-qr{margin:10px; width:700px;height:370px;border-radius:20px;border:4px solid rgb(12,111,204);padding:10px}.text-title-card-qr{text-align:center;font-weight:bolder}.row-qr{height:100%; padding:10px}.col-qr{height:100%}.list-group{display:flex;flex-direction:column;padding-left:0;margin-bottom:0}.list-group-item:first-child{border-top-left-radius:0.25rem;border-top-right-radius:0.25rem}';
    styles += ' .list-group-item{position:relative;display:block;padding:0.75rem 1.25rem;margin-bottom:-1px;background-color:#fff;border:1px solid rgba(0,0,0,0.125)}*,*::before,*::after{box-sizing:border-box}li{display:list-item;text-align:-webkit-match-parent}ol,ul,dl{margin-top:0;margin-bottom:1rem}</style>';
    const printContent = document.getElementById("print");
    const WindowPrt = window.open('', '', 'left=0,top=50,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write('<html><head>');
    WindowPrt.document.write(styles);
    WindowPrt.document.write('</head><body>');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.write('</body></html>');
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
  }

  initResetPass(usuario: Usuario, modal): void {
    this.usuario = usuario;
    this.modalService.open(modal, {ariaLabelledBy: 'modalCitaLabel', centered: true, size: 'lg'});
  }

  initModificarMedico(usuario: Usuario, modal): void {
    this.usuario = usuario;
    this.modificarMedicoForm.controls.id.setValue(usuario.id);
    this.modificarMedicoForm.controls.nombres.setValue(usuario.medico?.nombres);
    this.modificarMedicoForm.controls.apellidos.setValue(usuario.medico?.apellidos);
    this.modificarMedicoForm.controls.run.setValue(usuario.medico?.run);
    this.modificarMedicoForm.controls.telefono.setValue(usuario.medico?.telefono);
    this.modificarMedicoForm.controls.fecha_nacimiento.setValue(usuario.medico?.fecha_nacimiento);
    this.fecha_nac_med_val= usuario.medico?.fecha_nacimiento;
    this.modificarMedicoForm.controls.email.setValue(usuario.email);
    this.modificarMedicoForm.controls.username.setValue(usuario.username);
    this.modificarMedicoForm.controls.especialidad.setValue(usuario.medico?.especialidad);
    this.modalService.open(modal, {ariaLabelledBy: 'modalCitaLabel', centered: true, size: 'lg'});
  }

  initModificarFarmacia(usuario: Usuario, modal): void {
    this.usuario = usuario;
    this.modificarFarmaciaForm.controls.id.setValue(usuario.id);
    this.modificarFarmaciaForm.controls.nombres.setValue(usuario.farmacia?.nombres);
    this.modificarFarmaciaForm.controls.apellidos.setValue(usuario.farmacia?.apellidos);
    this.modificarFarmaciaForm.controls.run.setValue(usuario.farmacia?.run);
    this.modificarFarmaciaForm.controls.telefono.setValue(usuario.farmacia?.telefono);
    this.modificarFarmaciaForm.controls.fecha_nacimiento.setValue(usuario.farmacia?.fecha_nacimiento);
    this.fecha_nac_far_val= usuario.farmacia?.fecha_nacimiento;
    this.modificarFarmaciaForm.controls.email.setValue(usuario.email);
    this.modificarFarmaciaForm.controls.username.setValue(usuario.username);
    this.modificarFarmaciaForm.controls.cargo.setValue(usuario.farmacia?.cargo);
    this.modalService.open(modal, {ariaLabelledBy: 'modalCitaLabel', centered: true, size: 'lg'});
  }

  initQRCard(usuario: Usuario, modal): void {
    this.usuario = usuario;
    this.modalService.open(modal, {ariaLabelledBy: 'modalCitaLabel', centered: true, size: 'lg'});
  }

  initModificarMeson(usuario: Usuario, modal): void {
    this.usuario = usuario;
    this.modificarMesonForm.controls.id.setValue(usuario.id);
    this.modificarMesonForm.controls.nombres.setValue(usuario.meson?.nombres);
    this.modificarMesonForm.controls.apellidos.setValue(usuario.meson?.apellidos);
    this.modificarMesonForm.controls.run.setValue(usuario.meson?.run);
    this.modificarMesonForm.controls.telefono.setValue(usuario.meson?.telefono);
    this.modificarMesonForm.controls.fecha_nacimiento.setValue(usuario.meson?.fecha_nacimiento);
    this.fecha_nac_mes_val= usuario.meson?.fecha_nacimiento;
    this.modificarMesonForm.controls.email.setValue(usuario.email);
    this.modificarMesonForm.controls.username.setValue(usuario.username);
    this.modificarMesonForm.controls.cargo.setValue(usuario.meson?.cargo);
    this.modalService.open(modal, {ariaLabelledBy: 'modalCitaLabel', centered: true, size: 'lg'});
  }

  initModificarPaciente(usuario: Usuario, modal): void {
    this.usuario = usuario;
    this.modificarPacienteForm.controls.id.setValue(usuario.id);
    this.modificarPacienteForm.controls.nombres.setValue(usuario.paciente?.nombres);
    this.modificarPacienteForm.controls.apellidos.setValue(usuario.paciente?.apellidos);
    this.modificarPacienteForm.controls.run.setValue(usuario.paciente?.run);
    this.modificarPacienteForm.controls.telefono.setValue(usuario.paciente?.telefono);
    this.modificarPacienteForm.controls.fecha_nacimiento.setValue(usuario.paciente?.fecha_nacimiento);
    this.fecha_nac_pac_val= usuario.paciente?.fecha_nacimiento;
    this.modificarPacienteForm.controls.email.setValue(usuario.email);
    this.modificarPacienteForm.controls.username.setValue(usuario.username);
    this.modalService.open(modal, {ariaLabelledBy: 'modalCitaLabel', centered: true, size: 'lg'});
  }

  resetPassSubmit(): void {
    this.modalService.dismissAll();
    this.service.resetPassword({email: this.usuario.email, id: this.usuario.id}).subscribe((response: any) => {
        if(response.code == 200){
            this.info = response.mensaje;
            this.success = true;
        }else{
            this.hasError = true;
            this.infoError = response.mensaje;
        }
    });
  }

  reset(): void {
    this.modificarFarmaciaForm.reset();
    this.modificarMesonForm.reset();
    this.modificarMedicoForm.reset();
    this.modificarPacienteForm.reset();
    this.fecha_nac_far_val = null;
    this.fecha_nac_mes_val = null;
    this.fecha_nac_med_val = null;
    this.fecha_nac_pac_val = null;
    this.submitPaciente = false;
    this.submitMedico = false;
    this.submitMeson = false;
    this.submitFarmacia = false;
  }

  modificarPacienteSubmit(): void {
    this.hasError = false;
    this.success = false;
    this.submitPaciente = true;
    let fecha: string = this.modificarPacienteForm.controls.fecha_nacimiento.value;
    fecha = fecha.split('-')[2] + '-' + fecha.split('-')[1] + '-' +fecha.split('-')[0];
    let datos: any = this.modificarPacienteForm.value;
    datos.fecha_nacimiento = fecha;
    this.modalService.dismissAll();
    if(this.modificarPacienteForm.valid){
        this.service.modificarPaciente(datos).subscribe((data: any) => {
            if(data.code == 200){
                this.info = data.mensaje;
                this.success = true;
                this.usuarios = data.usuarios;
                this.reset();
            }else{
                this.info = data.mensaje;
                this.hasError = true;
            }
        });
    }
  }

  modificarMedicoSubmit(): void {
    this.hasError = false;
    this.success = false;
    this.submitMedico = true;
    let fecha: string = this.modificarMedicoForm.controls.fecha_nacimiento.value;
    fecha = fecha.split('-')[2] + '-' + fecha.split('-')[1] + '-' +fecha.split('-')[0];
    let datos: any = this.modificarMedicoForm.value;
    datos.fecha_nacimiento = fecha;
    this.modalService.dismissAll();
    if(this.modificarMedicoForm.valid){
        this.service.modificarMedico(datos).subscribe((data: any) => {
            if(data.code == 200){
                this.info = data.mensaje;
                this.success = true;
                this.usuarios = data.usuarios;
                this.reset();
            }else{
                this.info = data.mensaje;
                this.hasError = true;
            }
        });
    }
  }

  modificarMesonSubmit(): void {
    this.hasError = false;
    this.success = false;
    this.submitMeson = true;
    let fecha: string = this.modificarMesonForm.controls.fecha_nacimiento.value;
    fecha = fecha.split('-')[2] + '-' + fecha.split('-')[1] + '-' +fecha.split('-')[0];
    let datos: any = this.modificarMesonForm.value;
    datos.fecha_nacimiento = fecha;
    this.modalService.dismissAll();
    if(this.modificarMesonForm.valid){
        this.service.modificarMeson(datos).subscribe((data: any) => {
            if(data.code == 200){
                this.info = data.mensaje;
                this.success = true;
                this.usuarios = data.usuarios;
                this.reset();
            }else{
                this.info = data.mensaje;
                this.hasError = true;
            }
        });
    }
  }

  modificarFarmaciaSubmit(): void {
    this.hasError = false;
    this.success = false;
    this.submitFarmacia = true;
    let fecha: string = this.modificarFarmaciaForm.controls.fecha_nacimiento.value;
    fecha = fecha.split('-')[2] + '-' + fecha.split('-')[1] + '-' +fecha.split('-')[0];
    let datos: any = this.modificarFarmaciaForm.value;
    datos.fecha_nacimiento = fecha;
    this.modalService.dismissAll();
    if(this.modificarFarmaciaForm.valid){
        this.service.modificarFarmacia(datos).subscribe((data: any) => {
            if(data.code == 200){
                this.info = data.mensaje;
                this.success = true;
                this.usuarios = data.usuarios;
                this.reset();
            }else{
                this.info = data.mensaje;
                this.hasError = true;
            }
        });
    }else{
        console.log(this.modificarFarmaciaForm.errors);
    }
  }

  getNombres(usuario: Usuario):string {
    switch (usuario.rol_id) {
        case this.ROL_MESON:
            return usuario.meson?.nombres;
        case this.ROL_FARMACIA:
            return usuario.farmacia?.nombres;
        case this.ROL_MEDICO:
            return usuario.medico?.nombres;
        case this.ROL_PACIENTE:
            return usuario.paciente?.nombres;
    }
  }

  getRUN(usuario: Usuario):string {
    switch (usuario.rol_id) {
        case this.ROL_MESON:
            return usuario.meson?.run;
        case this.ROL_FARMACIA:
            return usuario.farmacia?.run;
        case this.ROL_MEDICO:
            return usuario.medico?.run;
        case this.ROL_PACIENTE:
            return usuario.paciente?.run;
    }
  }

  getApellidos(usuario: Usuario):string {
    switch (usuario.rol_id) {
        case this.ROL_MESON:
            return usuario.meson?.apellidos;
        case this.ROL_FARMACIA:
            return usuario.farmacia?.apellidos;
        case this.ROL_MEDICO:
            return usuario.medico?.apellidos;
        case this.ROL_PACIENTE:
            return usuario.paciente?.apellidos;
    }
  }

  getEspecialidadOrCargo(usuario: Usuario):string {
    switch (usuario.rol_id) {
        case this.ROL_MESON:
            return usuario.meson?.cargo;
        case this.ROL_FARMACIA:
            return usuario.farmacia?.cargo;
        case this.ROL_MEDICO:
            return usuario.medico?.especialidad;
        case this.ROL_PACIENTE:
            return '-';
    }
  }

}
