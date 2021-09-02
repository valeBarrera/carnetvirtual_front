import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-gestion-farmacia',
  templateUrl: './gestion-farmacia.component.html',
  styleUrls: ['./gestion-farmacia.component.css'],
  animations: [routerTransition()]
})
export class GestionFarmaciaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
