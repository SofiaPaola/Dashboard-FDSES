import {
  NgModule,
  LOCALE_ID,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../../@theme/theme.module';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbOptionModule, NbSelectModule } from '@nebular/theme';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { SolicitudDetalleCompraRoutingModule } from './solicitudDetalleCompra-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetalleComponent } from './detalle/detalle.component';
import { SolicitudDetalleCompraComponent } from './solicitudCompraDetalle/solicitudDetalleCompra.component';
import { FormDetalleComponent } from './formulario/formDetalle.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

registerLocaleData(localeES, 'es');

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    SolicitudDetalleCompraRoutingModule,
    NgxPaginationModule,
    NbSelectModule,
    NbOptionModule,
    NbInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NbFormFieldModule,
    NbLayoutModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    //{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  declarations: [
    SolicitudDetalleCompraComponent,
    DetalleComponent,
    FormDetalleComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SolicitudDetalleCompraModule {}
