import {
  NgModule,
  LOCALE_ID,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { CompraRoutingModule } from './compra-routing.module';
import { CompraComponent } from './compra.component';

registerLocaleData(localeES, 'es');
@NgModule({
  imports: [FormsModule, ThemeModule, NbCardModule, CompraRoutingModule],
  declarations: [CompraComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [CompraRoutingModule],
})
export class CompraModule {}
