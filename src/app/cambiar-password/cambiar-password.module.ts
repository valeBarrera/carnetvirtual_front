import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CambiarPasswordRoutingModule } from './cambiar-password-routing.module';
import { CambiarPasswordComponent } from './cambiar-password.component';


@NgModule({
  declarations: [CambiarPasswordComponent],
  imports: [
    CommonModule,
    CambiarPasswordRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CambiarPasswordModule { }
