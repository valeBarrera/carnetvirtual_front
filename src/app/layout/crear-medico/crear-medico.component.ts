import { MedicoService } from './medico.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-crear-medico',
  templateUrl: './crear-medico.component.html',
  styleUrls: ['./crear-medico.component.css'],
  animations: [routerTransition()]
})
export class CrearMedicoComponent implements OnInit {

  registerForm: FormGroup;
  @ViewChild("fecha_nac") fecha_nac: ElementRef;

  submit: boolean = false;
  error: boolean = false;
  success: boolean = false;
  info: string = '';
  errores: any;

  objectKeys = Object.keys;

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
  ]

  constructor(private service: MedicoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
        {
            username: [null, [Validators.required, Validators.minLength(6)]],
            email: [null, [Validators.required, Validators.email]],
            telefono: [null, [Validators.required, Validators.pattern('\\d{8}')]],
            fecha_nacimiento: [null, [Validators.required, Validators.maxLength(12)]],
            nombres: [null, [Validators.required, Validators.maxLength(60)]],
            apellidos: [null, [Validators.required, Validators.maxLength(60)]],
            especialidad: [this.especialidades[0], [Validators.required, Validators.maxLength(20)]],
            run: [null, [Validators.required, Validators.pattern('\\d{7,8}')]],
        }
    );
  }

  reset(): void {
      this.registerForm.reset();
      this.fecha_nac.nativeElement.value = null;
      this.registerForm.controls.especialidad.setValue(this.especialidades[0]);
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
        this.service.registrarMedico(datos).subscribe((data: any) => {
            this.submit = false;
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
    }else{
        console.log(this.registerForm.valid, this.registerForm.errors);
    }
  }

}
