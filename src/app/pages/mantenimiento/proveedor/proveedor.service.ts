import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Ciudad } from '../ciudad';
import { TipoDocumento } from '../tipo_documento';
import { Proveedor } from './proveedor';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private urlEndPoint: string = 'http://localhost:8080/api/proveedores';

  private _notificarUpload = new EventEmitter<any>();

  constructor(private http: HttpClient, private router: Router) {}

  get notificarUpload(): EventEmitter<any> {
    return this._notificarUpload;
  }

  getTipoDocumento(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(
      this.urlEndPoint + '/tipos_documentos'
    );
  }

  getCiudades(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(this.urlEndPoint + '/ciudades');
  }

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get(this.urlEndPoint).pipe(
      tap((response) => {
        let proveedores = response as Proveedor[];
        console.log('ProveedorService: tap 1');
        proveedores.forEach((proveedor) => {
          console.log(proveedor.nombre);
        });
      }),
      map((response) => {
        let proveedores = response as Proveedor[];
        return proveedores.map((proveedor) => {
          proveedor.nombre = proveedor.nombre.toUpperCase();
          return proveedor;
        });
      }),
      tap((response) => {
        console.log('ProveedorService: tap 2');
        response.forEach((proveedor) => {
          console.log(proveedor.nombre);
        });
      })
    );
  }

  create(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post(this.urlEndPoint, proveedor).pipe(
      map((response: any) => response.proveedor as Proveedor),
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

  getProveedor(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/proveedores']);
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  update(proveedor: Proveedor): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${proveedor.id}`, proveedor)
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

  delete(id: number): Observable<Proveedor> {
    return this.http.delete<Proveedor>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  subirArchivo(archivo: File, id: any): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    const req = new HttpRequest(
      'POST',
      `${this.urlEndPoint}/upload`,
      formData,
      {
        reportProgress: true,
      }
    );

    return this.http.request(req);
  }
}
