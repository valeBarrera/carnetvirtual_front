import { Usuario } from './../../../shared/model/usuario';
import { Paciente } from './../../../shared/model/paciente';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-qr',
  templateUrl: './card-qr.component.html',
  styleUrls: ['./card-qr.component.css']
})
export class CardQrComponent implements OnInit {

  @Input() usuario: Usuario;
  paciente: Paciente;
  id: string = "";
  url_qr: string = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=';

  constructor() { }

  ngOnInit(): void {
    this.paciente = this.usuario.paciente;
    this.id = this.usuario.id.toString();
    this.url_qr = 'https://chart.googleapis.com/chart?chs=310x310&cht=qr&chl=' + this.id;
  }

}
