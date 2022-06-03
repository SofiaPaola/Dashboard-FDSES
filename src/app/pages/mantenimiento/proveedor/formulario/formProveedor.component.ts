import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ProveedorService } from '../proveedor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ciudad } from '../../ciudad';
import { TipoDocumento } from '../../tipo_documento';
import { Proveedor } from '../proveedor';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-from',
  templateUrl: './formProveedor.component.html',
})
export class FormProveedorComponent implements OnInit {
  public proveedor: Proveedor = new Proveedor();

  ciudades!: Ciudad[];
  tipos_documentos!: TipoDocumento[];
  titulo: string = 'Crear / Editar Proveedor';
  private archivoSeleccionada!: File;
  errores!: string[];
  progreso: number = 0;

  constructor(
    private proveedorService: ProveedorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      let id = +params.get('id');
      if (id) {
        this.proveedorService
          .getProveedor(id)
          .subscribe((proveedor) => (this.proveedor = proveedor));
      }
    });

    this.proveedorService
      .getCiudades()
      .subscribe((ciudades) => (this.ciudades = ciudades));
    this.proveedorService
      .getTipoDocumento()
      .subscribe(
        (tipos_documentos) => (this.tipos_documentos = tipos_documentos)
      );
  }

  create(): void {
    console.log(this.proveedor);
    this.proveedorService.create(this.proveedor).subscribe(
      (proveedor) => {
        this.router.navigate(['/pages/mantenimiento/proveedores']);
        swal.fire(
          'Nuevo proveedor',
          `El proveedor ${proveedor.nombre} ha sido creado con éxito`,
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
    console.log(this.proveedor);
    //this.cliente.facturas = null;
    this.proveedorService.update(this.proveedor).subscribe(
      (json) => {
        this.router.navigate(['/pages/mantenimiento/proveedores']);
        swal.fire(
          'Proveedor Actualizado',
          `${json.mensaje}: ${json.proveedor.nombre}`,
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

  compararTipoDocumento(v1: TipoDocumento, v2: TipoDocumento): boolean {
    if (v1 === undefined && v2 === undefined) {
      return true;
    }

    return v1 === null || v2 === null || v1 === undefined || v2 === undefined
      ? false
      : v1.id === v2.id;
  }

  compararCiudad(v1: Ciudad, v2: Ciudad): boolean {
    if (v1 === undefined && v2 === undefined) {
      return true;
    }

    return v1 === null || v2 === null || v1 === undefined || v2 === undefined
      ? false
      : v1.id === v2.id;
  }

  seleccionarArchivo(event: any) {
    this.archivoSeleccionada = event.target.files[0];
    console.log(this.archivoSeleccionada);
    if (
      this.archivoSeleccionada.type.indexOf('application/pdf') < 0 //||
      //this.archivoSeleccionada.type.indexOf('application/msword') < 0
    ) {
      swal.fire(
        'Error seleccionar archivo: ',
        'El archivo debe ser del tipo pdf',
        'error'
      );
      this.archivoSeleccionada == null;
    }
  }

  subirArchivo() {
    if (!this.archivoSeleccionada) {
      swal.fire('Error Upload: ', 'Debe seleccionar un documento', 'error');
    } else {
      this.proveedorService
        .subirArchivo(this.archivoSeleccionada, this.proveedor.id)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            //this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.proveedor = response.proveedor as Proveedor;

            this.proveedorService.notificarUpload.emit(this.proveedor);
            swal.fire(
              'El archivo se ha subido completamente!',
              response.mensaje,
              'success'
            );
          }
        });
    }
  }
}
