import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Ciudad } from '../../ciudad';
import { TipoDocumento } from '../../tipo_documento';
/*import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';*/
import { Departamento } from '../../departamento';
import { ModalService } from '../../modal.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente';
@Component({
  selector: 'ngx-formCliente',
  templateUrl: './formCliente.component.html',
  styleUrls: ['./formCliente.component.scss']
})
export class FormClienteComponent implements OnInit {
  public cliente: Cliente = new Cliente();

  ciudades!: Ciudad[];
  tipos_documentos!: TipoDocumento[];
  departamentos!: Departamento[];
  titulo: string = 'Crear Cliente';

  //autocompleteControl = new FormControl();
  //ciudadesFiltrados: Observable<Ciudad[]>;

  errores!: string[] | any;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    public modalService: ModalService,
    private activatedRoute: ActivatedRoute
  ) {}

  cerrarModalNuevoCliente() {
    this.modalService.cerrarModalNuevo();
  }

  source: LocalDataSource = new LocalDataSource();

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      let id = +params.get('id');
      if (id) {
        this.clienteService
          .getCliente(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });

    this.clienteService
      .getCiudades()
      .subscribe((ciudades) => (this.ciudades = ciudades));

    this.clienteService
      .getTipoDocumento()
      .subscribe(
        (tipos_documentos) => (this.tipos_documentos = tipos_documentos)
      );

    this.clienteService.getDepartamento().subscribe(
      (departamentos) => (this.departamentos = departamentos)
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
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      (cliente) => {
        this.router.navigate(['/pages/mantenimiento/clientes']);
        swal.fire(
          'Nuevo cliente',
          `El cliente ${cliente.nombre} ha sido creado con éxito`,
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
    console.log(this.cliente);
    //this.cliente.facturas = null;
    this.clienteService.update(this.cliente).subscribe(
      (json) => {
        this.router.navigate(['/pages/matenimiento/clientes']);
        swal.fire(
          'Cliente Actualizado',
          `${json.mensaje}: ${json.cliente.nombre}`,
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
