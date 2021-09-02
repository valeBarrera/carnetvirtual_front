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

import { CrearCitaRoutingModule } from './crear-cita-routing.module';
import { CrearCitaComponent } from './crear-cita.component';


@NgModule({
  declarations: [CrearCitaComponent],
  imports: [
    CommonModule,
    CrearCitaRoutingModule,
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
export class CrearCitaModule { }
