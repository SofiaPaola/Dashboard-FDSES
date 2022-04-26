import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NbCardModule, NbListModule, NbMenuModule, NbDialogModule, NbDatepickerModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';

registerLocaleData(localeES, 'es');
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NgxPaginationModule,
    NbListModule,
    NbCardModule,
    NbDialogModule,
    NbDatepickerModule.forRoot(),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' },],
  declarations: [PagesComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class PagesModule {}
