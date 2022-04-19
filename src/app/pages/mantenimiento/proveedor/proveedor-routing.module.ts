import {
    NgModule,
    LOCALE_ID,
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  } from '@angular/core';
  import { Routes, RouterModule } from '@angular/router';
  
  import { registerLocaleData } from '@angular/common';
  import localeES from '@angular/common/locales/es';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { FormProveedorComponent } from './formulario/formProveedor.component';
  
  registerLocaleData(localeES, 'es');
  
  const routes: Routes = [
    {
      path: '',
      component: ProveedoresComponent,
    },
    {
      path: 'formProveedor',
      component: FormProveedorComponent,
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [{ provide: LOCALE_ID, useValue: 'es' }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  })
  export class ProveedorRoutingModule {}
  