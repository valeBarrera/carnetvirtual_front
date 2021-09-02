import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionFarmaciaRoutingModule } from './gestion-farmacia-routing.module';
import { GestionFarmaciaComponent } from './gestion-farmacia.component';


@NgModule({
  declarations: [GestionFarmaciaComponent],
  imports: [
    CommonModule,
    GestionFarmaciaRoutingModule,
    PageHeaderModule
  ]
})
export class GestionFarmaciaModule { }
