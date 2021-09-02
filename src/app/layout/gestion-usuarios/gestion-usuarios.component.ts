import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css'],
  animations: [routerTransition()]
})
export class GestionUsuariosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
