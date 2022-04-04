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
import { MantenimientoComponent } from './mantenimiento.component';
import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { FormProveedorComponent } from './proveedores/formulario/formProveedor.component';
import { DetallesComponent } from './vendedores/detalles/detalles.component';
import { FormVendedorComponent } from './vendedores/formulario/formVendedor.component';
import { DetallesComponents } from './proveedores/detalles/detalles.components';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { FormClienteComponent } from './clientes/formulario/formCliente.component';

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
    MantenimientoRoutingModule,
  ],
  declarations: [
    MantenimientoComponent,
    ClientesComponent,
    FormClienteComponent,
    DetalleComponent,
    ProveedoresComponent,
    FormProveedorComponent,
    DetallesComponent,
    VendedoresComponent,
    FormVendedorComponent,
    DetallesComponents,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class MantenimientoModule {}
