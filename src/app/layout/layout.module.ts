import { LectorQrComponent } from './components/lector-qr/lector-qr.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { DataPacienteComponent } from './components/data-paciente/data-paciente.component';
import { CardQrComponent } from './components/card-qr/card-qr.component';
import { NgxKjuaModule } from 'ngx-kjua';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        HttpClientModule,
		FormsModule,
    	ReactiveFormsModule,
        ZXingScannerModule,
        NgxKjuaModule
    ],
    exports: [LectorQrComponent, DataPacienteComponent, CardQrComponent],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, LectorQrComponent, DataPacienteComponent, CardQrComponent]
})
export class LayoutModule {}
