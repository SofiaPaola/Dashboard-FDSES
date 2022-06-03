import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Ciudad } from '../ciudad';
import { TipoDocumento } from '../tipo_documento';
import { Vendedor } from './vendedor';

@Injectable({
  providedIn: 'root',
})
export class VendedorService {
  private urlEndPoint: string = 'http://localhost:8080/api/vendedores';

  constructor(private http: HttpClient, private router: Router) {}

  getTipoDocumento(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(
      this.urlEndPoint + '/tipos_documentos'
    );
  }

  getCiudades(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(this.urlEndPoint + '/ciudades');
  }

  getVendedores(): Observable<Vendedor[]> {
    return this.http.get(this.urlEndPoint).pipe(
      tap((response) => {
        let vendedores = response as Vendedor[];
        console.log('VendedorService: tap 1');
        vendedores.forEach((vendedor) => {
          console.log(vendedor.nombre);
        });
      }),
      map((response) => {
        let vendedores = response as Vendedor[];
        return vendedores.map((vendedor) => {
          vendedor.nombre = vendedor.nombre.toUpperCase();
          return vendedor;
        });
      }),
      tap((response) => {
        console.log('VendedorService: tap 2');
        response.forEach((vendedor) => {
          console.log(vendedor.nombre);
        });
      })
    );
  }

  getVendedor(id: number): Observable<Vendedor> {
    return this.http.get<Vendedor>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/vendedores']);
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  create(vendedor: Vendedor): Observable<Vendedor> {
    return this.http.post(this.urlEndPoint, vendedor).pipe(
      map((response: any) => response.cliente as Vendedor),
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

  update(vendedor: Vendedor): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${vendedor.id}`, vendedor)
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

  delete(id: number): Observable<Vendedor> {
    return this.http.delete<Vendedor>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
