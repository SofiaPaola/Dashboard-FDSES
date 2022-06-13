import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CompraSolicitudCompraDetalleService } from '../compraSolicitudCompraDetalle.service';
import { CompraDetalleSolicitudCompra } from '../detalle_solicitud_compra';
import { CentroCosto } from '../../centro_costo';
import { CompraElemento } from '../../elemento';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemDetalleSolicitudCompra } from '../item_detalle_solicitud_compra';
@Component({
  selector: 'ngx-formCliente',
  templateUrl: './formDetalle.component.html',
  styleUrls: ['./formDetalle.component.scss'],
})
export class FormDetalleComponent implements OnInit {
  titulo: string = 'Nuevo detalle de solicitud de compra';
  detalleCompra: CompraDetalleSolicitudCompra =
    new CompraDetalleSolicitudCompra();

  centro_costos!: CentroCosto[];
  autocompleteControl = new FormControl();
  elementosFiltrados!: Observable<CompraElemento[]>;
  errores!: string[];

  constructor(
    private detalleCompraService: CompraSolicitudCompraDetalleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.paramMap.subscribe((params) => {
    //   let solicitudId = +params.get('solicitudId');
    //   this.detalleCompraService
    //     .getSolicitudDetalleCompra(solicitudId)
    //     .subscribe(
    //       (solicitud_compra) =>
    //         (this.detalleCompra.solicitud_compra = solicitud_compra)
    //     );
    // });

    this.elementosFiltrados = this.autocompleteControl.valueChanges.pipe(
      map((value) => (typeof value === 'string' ? value : value.nombre)),
      flatMap((value) => (value ? this._filter(value) : []))
    );
  }

  private _filter(value: string): Observable<CompraElemento[]> {
    const filterValue = value.toLowerCase();

    return this.detalleCompraService.filtrarElemento(filterValue);
  }

  mostrarNombre(elemnto?: CompraElemento): string | undefined {
    return elemnto ? elemnto.nombre : undefined;
  }

  seleccionarElemento(event: MatAutocompleteSelectedEvent): void {
    let elemento = event.option.value as CompraElemento;
    console.log(elemento);

    if (this.existeItem(elemento.id)) {
      this.incrementaCantidad(elemento.id);
    } else {
      let nuevoItem = new ItemDetalleSolicitudCompra();
      nuevoItem.elemento = elemento;
      this.detalleCompra.items.push(nuevoItem);
    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;

    if (cantidad == 0) {
      return this.eliminarItemDetalle(id);
    }

    this.detalleCompra.items = this.detalleCompra.items.map(
      (item: ItemDetalleSolicitudCompra) => {
        if (id === item.elemento.id) {
          item.cantidad = cantidad;
        }
        return item;
      }
    );
  }

  existeItem(id: number): boolean {
    let existe = false;
    this.detalleCompra.items.forEach((item: ItemDetalleSolicitudCompra) => {
      if (id === item.elemento.id) {
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id: number): void {
    this.detalleCompra.items = this.detalleCompra.items.map(
      (item: ItemDetalleSolicitudCompra) => {
        if (id === item.elemento.id) {
          ++item.cantidad;
        }
        return item;
      }
    );
  }

  eliminarItemDetalle(id: number): void {
    this.detalleCompra.items = this.detalleCompra.items.filter(
      (item: ItemDetalleSolicitudCompra) => id !== item.elemento.id
    );
  }

  // create(detalleForm: { form: { valid: any } }): void {
  //   console.log(this.detalleCompra);

  //   if (this.detalleCompra.items.length == 0) {
  //     this.autocompleteControl.setErrors({ invalid: true });
  //   }

  //   if (detalleForm.form.valid && this.detalleCompra.items.length > 0) {
  //     this.detalleCompraService
  //       .create(this.detalleCompra)
  //       .subscribe((detalleCompra) => {
  //         swal.fire(
  //           this.titulo,
  //           `Detalle De Solicitud ${this.detalleCompra.id} fue creada con exito`,
  //           'success'
  //         );
  //         this.router.navigate(['/solicitudDetalleCompra']);
  //       });
  //   }
  // }

  create(): void {
    console.log(this.detalleCompra);
    this.detalleCompraService.create(this.detalleCompra)
      .subscribe(
        detalleCompra => {
          this.router.navigate(['/pages/compra/solicitudDetalleCompra']);
          swal.fire('Nueva Solicitud detalle Compra', `El detalle compra ${detalleCompra.id} ha sido creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  comparaCentroCosto(o1: CentroCosto, o2: CentroCosto): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.id === o2.id;
  }
}
