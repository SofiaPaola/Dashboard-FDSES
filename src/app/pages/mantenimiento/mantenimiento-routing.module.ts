import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { MantenimientoComponent } from './mantenimiento.component';

const routes: Routes = [
  {
    path: '',
    component: MantenimientoComponent,
    children: [
      {
        path: 'clientes',
        component: ClientesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class MantenimientoRoutingModule {}
