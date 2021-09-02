import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-gestionar-cita',
  templateUrl: './gestionar-cita.component.html',
  styleUrls: ['./gestionar-cita.component.css'],
  animations: [routerTransition()]
})
export class GestionarCitaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
