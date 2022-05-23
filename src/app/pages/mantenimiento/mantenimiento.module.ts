import {
  NgModule,
  LOCALE_ID,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbCardModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { MantenimientoComponent } from './mantenimiento.component';
import { MantenimientoRoutingModule } from './mantenimiento-routing.module';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';

registerLocaleData(localeES, 'es');
@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    MantenimientoRoutingModule,
  ],
  declarations: [
    MantenimientoComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [MantenimientoRoutingModule]
})
export class MantenimientoModule {}
