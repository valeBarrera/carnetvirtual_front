import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearMesonRoutingModule } from './crear-meson-routing.module';
import { CrearMesonComponent } from './crear-meson.component';


@NgModule({
  declarations: [CrearMesonComponent],
  imports: [
    CommonModule,
    CrearMesonRoutingModule,
    PageHeaderModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CrearMesonModule { }
