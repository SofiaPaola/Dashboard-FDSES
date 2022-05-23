import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../proveedor';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { LocalDataSource } from 'ng2-smart-table';
import { ProveedorService } from '../proveedor.service';
import { ModalService } from '../../modal.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss'],
})
export class ProveedoresComponent implements OnInit {
  proveedores: any = Proveedor;

  filterpost = '';

  public page!: number;
  paginador: any;
  proveedorSeleccionado!: Proveedor;

  constructor(
    private proveedorService: ProveedorService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public modalService: ModalService
  ) {}

  ngOnInit() {
    this.proveedorService
      .getProveedores()
      .pipe(
        tap((proveedores) => {
          console.log('ProveedoresComponent: tap 3');
          proveedores.forEach((proveedor) => {
            console.log(proveedor.nombre);
          });
        })
      )
      .subscribe((proveedores) => (this.proveedores = proveedores));

    this.modalService.notificarUpload.subscribe((proveedor) => {
      this.proveedores = this.proveedores.map(
        (proveedorOriginal: { id: any }) => {
          if (proveedor.id == proveedorOriginal.id) {
            proveedorOriginal.id = proveedor.id;
          }
          return proveedorOriginal;
        }
      );
    });
  }

  source: LocalDataSource = new LocalDataSource();

  delete(proveedor: Proveedor): void {
    const swalfire = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalfire
      .fire({
        title: 'Está seguro?',
        text: `¿Seguro que desea eliminar al proveedor ${proveedor.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
        buttonsStyling: false,
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.proveedorService.delete(proveedor.id).subscribe((response) => {
            this.proveedores = this.proveedores.filter(
              (ven: Proveedor) => ven !== proveedor
            );
            swal.fire(
              'Proveedor Eliminado',
              `Proveedor ${proveedor.nombre} eliminado con éxito.`,
              'success'
            );
          });
        }
      });
  }

  abrirModal(proveedor: Proveedor) {
    this.proveedorSeleccionado = proveedor;
    this.modalService.abrirModal();
  }
}
