import {
  NgModule,
  LOCALE_ID,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { SolicitudDetalleCompraComponent } from './solicitudCompraDetalle/solicitudDetalleCompra.component';
import { FormDetalleComponent } from './formulario/formDetalle.component';
import { RoleGuard } from 'src/app/auth/guards/role.guard';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';

registerLocaleData(localeES, 'es');

const routes: Routes = [
  {
    path: '',
    component: SolicitudDetalleCompraComponent,
  },
  {
    path: 'formDetalle',
    component: FormDetalleComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'formDetalle/:id',
    component: FormDetalleComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  { path: '', redirectTo: 'solicitudDetalleCompra', pathMatch: 'full' },
  { path: '**', redirectTo: 'solicitudDetalleCompra' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SolicitudDetalleCompraRoutingModule {}
