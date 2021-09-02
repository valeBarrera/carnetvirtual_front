import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionarIncidenciaRoutingModule } from './gestionar-incidencia-routing.module';
import { GestionarIncidenciaComponent } from './gestionar-incidencia.component';


@NgModule({
  declarations: [GestionarIncidenciaComponent],
  imports: [
    CommonModule,
    GestionarIncidenciaRoutingModule,
    PageHeaderModule
  ]
})
export class GestionarIncidenciaModule { }
