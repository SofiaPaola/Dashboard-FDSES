import {
  NgModule,
  LOCALE_ID,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbSelectModule,
  NbInputModule,
  NbOptionModule,
  NbFormFieldModule,
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
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { DetallesComponents } from './detalles/detalles.components';
import { FormProveedorComponent } from './formulario/formProveedor.component';
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProveedorService } from './proveedor.service';
import { AuthInterceptor } from 'src/app/auth/interceptors/auth.interceptor';
import { TokenInterceptor } from 'src/app/auth/interceptors/token.interceptor';
import { FilterPipe } from './pipes/filter.pipe';

registerLocaleData(localeES, 'es');

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
    NbOptionModule,
    NbButtonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    NgxPaginationModule,
    ProveedorRoutingModule,
    NbFormFieldModule,
  ],
  providers: [
    ProveedorService,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  declarations: [
    ProveedoresComponent,
    DetallesComponents,
    FormProveedorComponent,
    FilterPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ProveedorModule {}
