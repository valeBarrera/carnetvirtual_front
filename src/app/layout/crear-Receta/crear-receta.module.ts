import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { LayoutModule } from './../layout.module';
import { CrearRecetaComponent } from './crear-receta.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearRecetaRoutingModule } from './crear-receta-routing.module';


@NgModule({
  declarations: [CrearRecetaComponent],
  imports: [
    CommonModule,
    CrearRecetaRoutingModule,
    PageHeaderModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ZXingScannerModule,
    LayoutModule
  ]
})
export class CrearRecetaModule { }
