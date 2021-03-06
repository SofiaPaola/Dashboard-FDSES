import {
  NgModule,
  LOCALE_ID,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { CompraComponent } from './compra.component';

registerLocaleData(localeES, 'es');

const routes: Routes = [
  {
    path: '',
    component: CompraComponent,
    children: [
      {
        path: 'solicitudDetalleCompra',
        loadChildren: () =>
          import('./compraDetalleSolicitud/solicitudDetalleCompra.module').then(
            (m) => m.SolicitudDetalleCompraModule
          ),
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
export class CompraRoutingModule {}
