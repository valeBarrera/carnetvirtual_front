import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CrearPacienteRoutingModule } from './crear-paciente-routing.module';
import { CrearPacienteComponent } from './crear-paciente.component';


@NgModule({
  declarations: [CrearPacienteComponent],
  imports: [
    CommonModule,
    CrearPacienteRoutingModule,
    PageHeaderModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CrearPacienteModule { }
