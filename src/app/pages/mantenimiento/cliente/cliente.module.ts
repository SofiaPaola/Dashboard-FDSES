import {
  NgModule,
  LOCALE_ID,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {
  NbCardModule,
  NbListModule,
  NbDialogModule,
  NbActionsModule,
  NbButtonModule,
  NbIconModule,
  NbRadioModule,
  NbSelectModule,
  NbTabsetModule,
  NbUserModule,
  NbInputModule,
  NbOptionModule,
} from '@nebular/theme';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClientesComponent } from './clientes/clientes.component';
import { DetalleComponent } from './detalle/detalle.component';
import { FormClienteComponent } from './formulario/formCliente.component';

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
    NbInputModule,
    NbSelectModule,
    NbOptionModule,
    NbButtonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    NgxPaginationModule,
    ClienteRoutingModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  declarations: [ClientesComponent, FormClienteComponent, DetalleComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ClienteModule {}
