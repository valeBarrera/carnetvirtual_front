import { AuthGuard } from './../shared/guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { RoleGuard } from '../shared/guard/role.guard';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'gestion-usuarios/crear-paciente',
                loadChildren: () => import('./crear-paciente/crear-paciente.module').then((m) => m.CrearPacienteModule),
                canActivate: [AuthGuard, RoleGuard],
                data: {
                    role: ['Mesón'],
                    type: 'Administrador'
                }
            },{
                path: 'gestion-usuarios/crear-meson',
                loadChildren: () => import('./crear-meson/crear-meson.module').then((m) => m.CrearMesonModule),
                canActivate: [AuthGuard, RoleGuard],
                data: {
                    role: ['Mesón'],
                    type: 'Administrador'
                }
            },{
                path: 'gestion-usuarios/crear-medico',
                loadChildren: () => import('./crear-medico/crear-medico.module').then((m) => m.CrearMedicoModule),
                canActivate: [AuthGuard, RoleGuard],
                data: {
                    role: ['Mesón'],
                    type: 'Administrador'
                }
            },{
                path: 'gestion-usuarios/crear-farmacia',
                loadChildren: () => import('./crear-farmacia/crear-farmacia.module').then((m) => m.CrearFarmaciaModule),
                canActivate: [AuthGuard, RoleGuard],
                data: {
                    role: ['Mesón'],
                    type: 'Administrador'
                }
            },{
                path: 'gestion-usuarios',
                loadChildren: () => import('./gestion-usuarios/gestion-usuarios.module').then((m) => m.GestionUsuariosModule),
                canActivate: [AuthGuard, RoleGuard],
                data: {
                    role: ['Mesón']
                }
            },{
                path: 'gestion-usuarios/listar',
                loadChildren: () => import('./listar-usuarios/listar-usuarios.module').then((m) => m.ListarUsuariosModule),
                canActivate: [AuthGuard, RoleGuard],
                data: {
                    role: ['Mesón'],
                }
            },{
                path: 'gestion-farmacia',
                loadChildren: () => import('./gestion-farmacia/gestion-farmacia.module').then((m) => m.GestionFarmaciaModule),
                canActivate: [AuthGuard, RoleGuard],
                data: {
                    role: ['Farmacia', 'Médico'],
                }
            },{
                path: 'gestion-farmacia/obtener-receta',
                loadChildren: () => import('./obtener-receta/obtener-receta.module').then((m) => m.ObtenerRecetaModule),
                canActivate: [AuthGuard, RoleGuard],
                data: {
                    role: ['Médico', 'Farmacia'],
                }
            },
            {
                path: 'gestion-farmacia/registrar-receta',
                loadChildren: () => import('./crear-receta/crear-receta.module').then((m) => m.CrearRecetaModule),
                canActivate: [AuthGuard, RoleGuard],
                data: {
                    role: ['Médico'],
                }
            },{
                path: 'gestion-cita',
                loadChildren: () => import('./gestionar-cita/gestionar-cita.module').then((m) => m.GestionarCitaModule),
                canActivate: [AuthGuard, RoleGuard],
                data: {
                    role: ['Mesón', 'Médico'],
                }
            },
            {
                path: 'gestion-cita/obtener-cita',
                loadChildren: () => import('./obtener-cita/obtener-cita.module').then((m) => m.ObtenerCitaModule),
                canActivate: [AuthGuard, RoleGuard],
                data: {
                    role: ['Mesón', 'Médico'],
                }
            },
            {
                path: 'gestion-cita/registrar-cita',
                loadChildren: () => import('./crear-cita/crear-cita.module').then((m) => m.CrearCitaModule),
                canActivate: [AuthGuard, RoleGuard],
                data: {
                    role: ['Mesón', 'Médico'],
                }
            },{
                path: 'gestion-incidencia',
                loadChildren: () => import('./gestionar-incidencia/gestionar-incidencia.module').then((m) => m.GestionarIncidenciaModule),
                canActivate: [AuthGuard, RoleGuard],
                data: {
                    role: ['Mesón'],
                }
            },
            {
                path: 'gestion-incidencia/obtener-incidencia',
                loadChildren: () => import('./obtener-incidencia/obtener-incidencia.module').then((m) => m.ObtenerIncidenciaModule),
                canActivate: [AuthGuard, RoleGuard],
                data: {
                    role: ['Mesón'],
                }
            },
            {
                path: 'gestion-incidencia/registrar-incidencia',
                loadChildren: () => import('./crear-incidencia/crear-incidencia.module').then((m) => m.CrearIncidenciaModule),
                canActivate: [AuthGuard, RoleGuard],
                data: {
                    role: ['Mesón'],
                }
            },


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
