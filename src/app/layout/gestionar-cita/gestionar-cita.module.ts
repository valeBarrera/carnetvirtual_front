import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionarCitaRoutingModule } from './gestionar-cita-routing.module';
import { GestionarCitaComponent } from './gestionar-cita.component';


@NgModule({
  declarations: [GestionarCitaComponent],
  imports: [
    CommonModule,
    GestionarCitaRoutingModule,
    PageHeaderModule
  ]
})
export class GestionarCitaModule { }
