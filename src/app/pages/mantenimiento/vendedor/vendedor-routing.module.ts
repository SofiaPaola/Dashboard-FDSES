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
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { RoleGuard } from 'src/app/auth/guards/role.guard';

registerLocaleData(localeES, 'es');

const routes: Routes = [
  {
    path: '',
    component: VendedoresComponent,
  },
  {
    path: 'formVendedor',
    component: FormVendedorComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'formVendedor/:id',
    component: FormVendedorComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  { path: '', redirectTo: 'vendedor', pathMatch: 'full' },
  { path: '**', redirectTo: 'vendedor' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class VendedorRoutingModule {}
