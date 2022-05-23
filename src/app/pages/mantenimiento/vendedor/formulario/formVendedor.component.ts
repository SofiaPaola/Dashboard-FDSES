import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Ciudad } from '../../ciudad';
import { TipoDocumento } from '../../tipo_documento';
import { VendedorService } from '../vendedor.service';
import { Vendedor } from '../vendedor';
/*import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';*/

@Component({
  selector: 'app-from',
  templateUrl: './formVendedor.component.html',
})
export class FormVendedorComponent implements OnInit {
  public vendedor: Vendedor = new Vendedor();

  ciudades!: Ciudad[];
  tipos_documentos!: TipoDocumento[];
  titulo: string = 'Crear / Editar Vendedor';

  //autocompleteControl = new FormControl();
  //ciudadesFiltrados: Observable<Ciudad[]>;

  errores!: string[];

  constructor(
    private vendedorService: VendedorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      let id = +params.get('id');
      if (id) {
        this.vendedorService
          .getVendedor(id)
          .subscribe((vendedor) => (this.vendedor = vendedor));
      }
    });

    this.vendedorService
      .getCiudades()
      .subscribe((ciudades) => (this.ciudades = ciudades));
    this.vendedorService
      .getTipoDocumento()
      .subscribe(
        (tipos_documentos) => (this.tipos_documentos = tipos_documentos)
      );

    /*this.ciudadesFiltrados = this.autocompleteControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.nombre),
      flatMap(value => value ? this._filter(value) : [])
    );*/
  }

  /*private _filter(value: string): Observable<Ciudad[]> {
    const filterValue = value.toLowerCase();

    return this.clienteService.filtrarCiudades(filterValue);
  }

  mostrarNombre(ciudad?: Ciudad): string | undefined {
    return ciudad ? ciudad.ciudad : undefined;
  }

  seleccionarCiudad(event: MatAutocompleteSelectedEvent): void {
    let ciudad = event.option.value as Ciudad;
    console.log(ciudad);

    /*if (this.existeItem(ciudad.id)) {
      this.incrementaCantidad(ciudad.id)
    } else {
      let nuevoItem = new ItemFactura;
      nuevoItem.producto = ciudad;
      this.factura.items.push(nuevoItem);
    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }*/

  create(): void {
    console.log(this.vendedor);
    this.vendedorService.create(this.vendedor).subscribe(
      (vendedor) => {
        this.router.navigate(['/pages/mantenimiento/vendedores']);
        swal.fire(
          'Nuevo vendedor',
          `El vendedor ${vendedor.nombre} ha sido creado con éxito`,
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    console.log(this.vendedor);
    //this.cliente.facturas = null;
    this.vendedorService.update(this.vendedor).subscribe(
      (json) => {
        this.router.navigate(['/pages/mantenimiento/vendedores']);
        swal.fire(
          'Vendedor Actualizado',
          `${json.mensaje}: ${json.vendedor.nombre}`,
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  compararCiudad(v1: Ciudad, v2: Ciudad): boolean {
    if (v1 === undefined && v2 === undefined) {
      return true;
    }

    return v1 === null || v2 === null || v1 === undefined || v2 === undefined
      ? false
      : v1.id === v2.id;
  }

  compararTipoDocumento(v1: TipoDocumento, v2: TipoDocumento): boolean {
    if (v1 === undefined && v2 === undefined) {
      return true;
    }

    return v1 === null || v2 === null || v1 === undefined || v2 === undefined
      ? false
      : v1.id === v2.id;
  }
}
