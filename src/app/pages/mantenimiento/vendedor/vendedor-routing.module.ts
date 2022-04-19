import {
  NgModule,
  LOCALE_ID,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { FormVendedorComponent } from './formulario/formVendedor.component';

registerLocaleData(localeES, 'es');

const routes: Routes = [
  {
    path: '',
    component: VendedoresComponent,
  },
  {
    path: 'formVendedor',
    component: FormVendedorComponent,
  },
  {
    path: 'formVendedor/:id',
    component: FormVendedorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class VendedorRoutingModule {}
