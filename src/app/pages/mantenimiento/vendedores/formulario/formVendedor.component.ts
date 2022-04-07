import { Component, OnInit } from '@angular/core';
import { Vendedor } from '../vendedor';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Ciudad } from '../../ciudad';
import { TipoDocumento } from '../../tipo_documento';
import { VendedorService } from '../vendedor.service';
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
  titulo: string = 'Crear Vendedor';

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
        this.router.navigate(['/vendedores']);
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
        this.router.navigate(['/vendedores']);
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

  compararCiudad(o1: Ciudad, o2: Ciudad): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.id === o2.id;
  }

  compararTipoDocumento(o1: TipoDocumento, o2: TipoDocumento): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.id === o2.id;
  }
}
