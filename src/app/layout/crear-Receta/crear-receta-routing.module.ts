import { CrearRecetaComponent } from './crear-receta.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
     {
        path: '',
        component: CrearRecetaComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearRecetaRoutingModule { }
