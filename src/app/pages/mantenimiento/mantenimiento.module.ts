import {
  NgModule,
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
  NbListModule,
  NbIconModule,
} from '@nebular/theme';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';
import { AngularEmojisModule } from 'angular-emojis';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

import { ThemeModule } from '../../@theme/theme.module';
import { ClientesComponent } from './clientes/clientes.component';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { FormComponent } from './clientes/formulario/form.component';
import { MantenimientoComponent } from './mantenimiento.component';
import { MantenimientoRoutingModule } from './mantenimiento-routing.module';

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
    AngularEmojisModule,
    NgxPaginationModule,
    MantenimientoRoutingModule
  ],
  declarations: [
    MantenimientoComponent,
    ClientesComponent,
    FormComponent,
    DetalleComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class MantenimientoModule {}
