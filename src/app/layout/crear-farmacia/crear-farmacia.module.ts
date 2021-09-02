import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearFarmaciaRoutingModule } from './crear-farmacia-routing.module';
import { CrearFarmaciaComponent } from './crear-farmacia.component';


@NgModule({
  declarations: [CrearFarmaciaComponent],
  imports: [
    CommonModule,
    CrearFarmaciaRoutingModule,
    PageHeaderModule,
    PageHeaderModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CrearFarmaciaModule { }
