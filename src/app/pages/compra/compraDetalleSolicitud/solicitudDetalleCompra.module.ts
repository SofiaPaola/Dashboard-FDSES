import {
  NgModule,
  LOCALE_ID,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../../@theme/theme.module';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { SolicitudDetalleCompraRoutingModule } from './solicitudDetalleCompra-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetalleComponent } from './detalle/detalle.component';
import { SolicitudDetalleCompraComponent } from './solicitudCompraDetalle/solicitudDetalleCompra.component';
import { FormDetalleComponent } from './formulario/formDetalle.component';

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
