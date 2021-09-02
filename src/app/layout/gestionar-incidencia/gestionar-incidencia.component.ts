import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-gestionar-incidencia',
  templateUrl: './gestionar-incidencia.component.html',
  styleUrls: ['./gestionar-incidencia.component.css'],
  animations: [routerTransition()]
})
export class GestionarIncidenciaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
