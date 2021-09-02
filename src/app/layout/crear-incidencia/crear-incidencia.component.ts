import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidenciaService } from './../gestionar-incidencia/incidencia.service';
import { Medico } from './../../shared/model/medico';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-crear-incidencia',
  templateUrl: './crear-incidencia.component.html',
  styleUrls: ['./crear-incidencia.component.css'],
  animations: [routerTransition()]
})
export class CrearIncidenciaComponent implements OnInit {

  incidenciaForm: FormGroup;
  dtOptions: DataTables.Settings = {};
  med_seleccionado: boolean = false;

  hasError: boolean = false;
  infoError: string = '';
  submit: boolean = false;
  success: boolean = false;
  info: string = '';

  medicos: Medico[] = [];
  medico: Medico;

  show: boolean = false;

  tipos: string[] = ['Médico en Vacaciones', 'Médico con Licencia'];

  constructor(private service: IncidenciaService,
    private formBuilder: FormBuilder) {
        this.incidenciaForm = this.formBuilder.group({
            descripcion: [null, [Validators.required]],
            tipo: [null, [Validators.required]],
            fecha: [null, [Validators.required]],
            medico_id: [null, [Validators.required]]
        });
    }

  ngOnInit(): void {
    this.incidenciaForm.controls.tipo.setValue(this.tipos[0]);
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
    this.service.obtenerMedicos().subscribe((response:any) => {
        if(response.code == 200){
            this.medicos = response.medicos;
            setTimeout(() => {
                this.show = true;
            }, 200);
        }
    });
  }

  onSubmit(): void {
    this.hasError = false;
    this.success = false;
    this.submit = true;
    if(this.incidenciaForm.valid){
        this.service.registrarInicidencia(this.incidenciaForm.value).subscribe((response:any) => {
            if(response.code == 200){
                this.info = response.mensaje;
                this.success = true;
                this.submit = false;
                this.incidenciaForm.reset();
                this.incidenciaForm.controls.tipo.setValue(this.tipos[0]);
                this.incidenciaForm.controls.medico_id.setValue(this.medico.id);
            }else{
                this.hasError = true;
                this.infoError = response.mensaje;
            }
        })
    }
  }

  elegirOtroMedico(): void {
    this.medico = null;
    this.incidenciaForm.controls.medico_id.setValue(null);
    this.med_seleccionado = false;
  }

  seleccionarMedico(medico): void {
    this.medico = medico;
    this.incidenciaForm.controls.medico_id.setValue(this.medico.id);
    this.med_seleccionado = true;
  }

}
