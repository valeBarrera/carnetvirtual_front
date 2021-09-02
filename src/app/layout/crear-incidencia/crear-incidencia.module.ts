import { DataTablesModule } from 'angular-datatables';
import { LayoutModule } from './../layout.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearIncidenciaRoutingModule } from './crear-incidencia-routing.module';
import { CrearIncidenciaComponent } from './crear-incidencia.component';


@NgModule({
  declarations: [CrearIncidenciaComponent],
  imports: [
    CommonModule,
    CrearIncidenciaRoutingModule,
    PageHeaderModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ZXingScannerModule,
    LayoutModule,
    DataTablesModule
  ]
})
export class CrearIncidenciaModule { }
