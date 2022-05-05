import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Ciudad } from '../ciudad';
import { TipoDocumento } from '../tipo_documento';
import { Clima } from '../clima';
import { Departamento } from '../departamento';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient, private router: Router) {}

  getTipoDocumento(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(this.urlEndPoint + '/tipos_documentos');
  }

  getCiudades(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(this.urlEndPoint + '/ciudades');
  }

  getClima(): Observable<Clima[]> {
    return this.http.get<Clima[]>(this.urlEndPoint + '/climas');
  }

  getDepartamento(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.urlEndPoint + '/departamentos');
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get(this.urlEndPoint).pipe(
      tap((response) => {
        let clientes = response as Cliente[];
        console.log('ClienteService: tap 1');
        clientes.forEach((cliente) => {
          console.log(cliente.nombre);
        });
      }),
      map((response) => {
        let clientes = response as Cliente[];
        return clientes.map((cliente) => {
          cliente.nombre = cliente.nombre.toUpperCase();
          return cliente;
        });
      }),
      tap((response) => {
        console.log('ClienteService: tap 2');
        response.forEach((cliente) => {
          console.log(cliente.nombre);
        });
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente).pipe(
      map((response: any) => response.cliente as Cliente),
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

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente)
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

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
