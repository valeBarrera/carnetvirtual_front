import { DataTablesModule } from 'angular-datatables';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObtenerIncidenciaRoutingModule } from './obtener-incidencia-routing.module';
import { ObtenerIncidenciaComponent } from './obtener-incidencia.component';


@NgModule({
  declarations: [ObtenerIncidenciaComponent],
  imports: [
    CommonModule,
    ObtenerIncidenciaRoutingModule,
    PageHeaderModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ZXingScannerModule,
    DataTablesModule
  ]
})
export class ObtenerIncidenciaModule { }
