import {
  NgModule,
  LOCALE_ID,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbIconModule,
  NbListModule,
  NbDialogModule,
} from '@nebular/theme';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

import { ThemeModule } from '../../@theme/theme.module';
import { MantenimientoComponent } from './mantenimiento.component';
import { MantenimientoRoutingModule } from './mantenimiento-routing.module';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { ClienteModule } from './cliente/cliente.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { VendedorModule } from './vendedor/vendedor.module';

registerLocaleData(localeES, 'es');
@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbDialogModule,
    NbUserModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    NgxPaginationModule,
    MantenimientoRoutingModule,
    ClienteModule,
    ProveedorModule,
    VendedorModule
  ],
  declarations: [
    MantenimientoComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [MantenimientoRoutingModule]
})
export class MantenimientoModule {}
