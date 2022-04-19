import {
  NgModule,
  LOCALE_ID,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MantenimientoComponent } from './mantenimiento.component';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';

registerLocaleData(localeES, 'es');

const routes: Routes = [
  {
    path: '',
    component: MantenimientoComponent,
    children: [
      {
        path: 'clientes',
        loadChildren: () =>
          import('./cliente/cliente.module').then((m) => m.ClienteModule),
      },
      {
        path: 'proveedores',
        loadChildren: () => import('./proveedor/proveedor.module').then((m) => m.ProveedorModule)
      },
      {
        path: 'vendedores',
        loadChildren: () => import('./vendedor/vendedor.module').then((m) => m.VendedorModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class MantenimientoRoutingModule {}
