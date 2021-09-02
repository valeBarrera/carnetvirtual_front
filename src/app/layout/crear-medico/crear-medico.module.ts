import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearMedicoRoutingModule } from './crear-medico-routing.module';
import { CrearMedicoComponent } from './crear-medico.component';


@NgModule({
  declarations: [CrearMedicoComponent],
  imports: [
    CommonModule,
    CrearMedicoRoutingModule,
    PageHeaderModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CrearMedicoModule { }
