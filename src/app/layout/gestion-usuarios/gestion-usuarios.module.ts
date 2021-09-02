import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionUsuariosRoutingModule } from './gestion-usuarios-routing.module';
import { GestionUsuariosComponent } from './gestion-usuarios.component';


@NgModule({
  declarations: [GestionUsuariosComponent],
  imports: [
    CommonModule,
    GestionUsuariosRoutingModule,
    PageHeaderModule
  ]
})
export class GestionUsuariosModule { }
