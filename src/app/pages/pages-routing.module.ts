import { RouterModule, Routes } from '@angular/router';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { PagesComponent } from './pages.component';
import { AngularEmojisModule } from 'angular-emojis';
import { NgxPaginationModule } from 'ngx-pagination';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';

registerLocaleData(localeES, 'es');

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'mantenimiento',
      loadChildren: () => import('./mantenimiento/mantenimiento.module')
        .then(m => m.MantenimientoModule),
    },
  ],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AngularEmojisModule,
    NgxPaginationModule
  ],
  exports: [ RouterModule ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' },],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class PagesRoutingModule {
}
