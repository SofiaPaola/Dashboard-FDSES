import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Unidad } from '../unidad';
import { CompraSolicitudCompra } from './solicitud_compra';
import { CompraElemento } from '../elemento';
import { CompraDetalleSolicitudCompra } from './detalle_solicitud_compra';

@Injectable({
  providedIn: 'root',
})
export class CompraSolicitudCompraDetalleService {
  private urlEndPoint: string =
    'http://localhost:8080/api/solicitudCompraDetalles';

  constructor(private http: HttpClient, private router: Router) {}

  getElemento(): Observable<CompraElemento[]> {
    return this.http.get<CompraElemento[]>(this.urlEndPoint + '/compraElemento');
  }

  getUnidad(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(this.urlEndPoint + '/unidad');
  }

  getCompraSolicitudCompra(): Observable<CompraSolicitudCompra[]> {
    return this.http.get<CompraSolicitudCompra[]>(
      this.urlEndPoint + '/compraSolicitud'
    );
  }

  getSolicitudDetalleCompras(): Observable<CompraDetalleSolicitudCompra[]> {
    return this.http.get(this.urlEndPoint).pipe(
      tap((response) => {
        let solicitudDetalleCompras =
          response as CompraDetalleSolicitudCompra[];
        console.log('Service: tap 1');
        solicitudDetalleCompras.forEach((solicitudDetalleCompra) => {
          console.log(solicitudDetalleCompra.id);
        });
      }),
      map((response) => {
        let solicitudDetalleCompras =
          response as CompraDetalleSolicitudCompra[];
        return solicitudDetalleCompras.map((solicitudDetalleCompra) => {
          return solicitudDetalleCompra;
        });
      }),
      tap((response) => {
        console.log('Service: tap 2');
        response.forEach((solicitudDetalleCompra) => {
          console.log(solicitudDetalleCompra.id);
        });
      })
    );
  }

  create(
    solicitudDetalleCompra: CompraDetalleSolicitudCompra
  ): Observable<CompraDetalleSolicitudCompra> {
    return this.http.post(this.urlEndPoint, solicitudDetalleCompra).pipe(
      map(
        (response: any) =>
          response.solicitudDetalleCompra as CompraDetalleSolicitudCompra
      ),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getSolicitudDetalleCompra(
    id: number
  ): Observable<CompraDetalleSolicitudCompra> {
    return this.http
      .get<CompraDetalleSolicitudCompra>(`${this.urlEndPoint}/${id}`)
      .pipe(
        catchError((e) => {
          if (e.status != 401 && e.error.mensaje) {
            this.router.navigate(['/solicitudDetalleCompra']);
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  update(
    solicitudDetalleCompra: CompraDetalleSolicitudCompra
  ): Observable<any> {
    return this.http
      .put<any>(
        `${this.urlEndPoint}/${solicitudDetalleCompra.id}`,
        solicitudDetalleCompra
      )
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  delete(id: number):Observable<CompraDetalleSolicitudCompra> {
    return this.http.delete<CompraDetalleSolicitudCompra>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

}
