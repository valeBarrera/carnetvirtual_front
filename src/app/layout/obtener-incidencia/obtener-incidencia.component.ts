import { Incidencia } from './../../shared/model/incidencia';
import { IncidenciaService } from './../gestionar-incidencia/incidencia.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';


@Component({
  selector: 'app-obtener-incidencia',
  templateUrl: './obtener-incidencia.component.html',
  styleUrls: ['./obtener-incidencia.component.css'],
  animations: [routerTransition()]
})
export class ObtenerIncidenciaComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  show: boolean = false;
  incidencias: Incidencia[] = [];

  constructor(private service: IncidenciaService) {
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

  ngOnInit(): void {
    this.service.obtenerIncidencias().subscribe((response:any)=>{
        if(response.code == 200){
            this.incidencias = response.incidencias;
            setTimeout(() => {
                this.show = true;
            }, 200);
        }
    });

  }

}
