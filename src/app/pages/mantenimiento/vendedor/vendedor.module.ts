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
import { VendedorRoutingModule } from './vendedor-routing.module';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { FormVendedorComponent } from './formulario/formVendedor.component';
import { DetallesComponent } from './detalles/detalles.component';
import { VendedorService } from './vendedor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
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
    VendedorRoutingModule,
    NbFormFieldModule,
  ],
  providers: [
    VendedorService,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  declarations: [VendedoresComponent, FormVendedorComponent, DetallesComponent, FilterPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class VendedorModule {}
