import {
  NgModule,
  LOCALE_ID, 
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { MantenimientoComponent } from './mantenimiento.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { FormProveedorComponent } from './proveedores/formulario/formProveedor.component';
import { FormVendedorComponent } from './vendedores/formulario/formVendedor.component';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { FormClienteComponent } from './clientes/formCliente.component';

registerLocaleData(localeES, 'es');

const routes: Routes = [
  {
    path: '',
    component: MantenimientoComponent,
    children: [
      {
        path: 'clientes',
        component: ClientesComponent,
        children: [
          {
            path: '/form',
            component: FormClienteComponent,
          },
        ],
      },
      {
        path: 'proveedores',
        component: ProveedoresComponent,
        children: [
          {
            path: 'formproveedor',
            component: FormProveedorComponent
          }
        ]
      },
      {
        path: 'vendedores',
        component: VendedoresComponent,
        children: [
          {
            path: 'formvendedor',
            component: FormVendedorComponent
          }
        ]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: LOCALE_ID, useValue: 'es' },],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class MantenimientoRoutingModule {}
