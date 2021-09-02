import { DataTablesModule } from 'angular-datatables';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { LayoutModule } from './../layout.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListarUsuariosRoutingModule } from './listar-usuarios-routing.module';
import { ListarUsuariosComponent } from './listar-usuarios.component';


@NgModule({
  declarations: [ListarUsuariosComponent],
  imports: [
    CommonModule,
    ListarUsuariosRoutingModule,
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
export class ListarUsuariosModule { }
