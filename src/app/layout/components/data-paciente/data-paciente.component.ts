import { Paciente } from './../../../shared/model/paciente';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-paciente',
  templateUrl: './data-paciente.component.html',
  styleUrls: ['./data-paciente.component.css']
})
export class DataPacienteComponent implements OnInit {

  @Input() paciente: Paciente;

  constructor() { }

  ngOnInit(): void {
  }

}
