import { LayoutModule } from './../layout.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { LectorQrComponent } from './../components/lector-qr/lector-qr.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObtenerRecetaRoutingModule } from './obtener-receta-routing.module';
import { ObtenerRecetaComponent } from './obtener-receta.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [ObtenerRecetaComponent],
  imports: [
    CommonModule,
    ObtenerRecetaRoutingModule,
    PageHeaderModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ZXingScannerModule,
    DataTablesModule
  ]
})
export class ObtenerRecetaModule { }
