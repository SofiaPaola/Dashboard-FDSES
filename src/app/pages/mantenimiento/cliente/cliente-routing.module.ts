import {
  NgModule,
  LOCALE_ID,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { ClientesComponent } from './clientes/clientes.component';
import { FormClienteComponent } from './formulario/formCliente.component';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { RoleGuard } from 'src/app/auth/guards/role.guard';

registerLocaleData(localeES, 'es');

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
  },
  {
    path: 'formCliente',
    component: FormClienteComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'formCliente/:id',
    component: FormClienteComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: '**', redirectTo: 'clientes' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ClienteRoutingModule {}
