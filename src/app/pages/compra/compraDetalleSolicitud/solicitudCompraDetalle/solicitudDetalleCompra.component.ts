import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/auth.service';
import { CompraSolicitudCompraDetalleService } from '../compraSolicitudCompraDetalle.service';
import { ModalService } from '../../../modal.service';
import { CompraDetalleSolicitudCompra } from '../detalle_solicitud_compra';

@Component({
  selector: 'ngx-solicitudDetalle',
  templateUrl: './solicitudDetalleCompra.component.html',
  styleUrls: ['./solicitudDetalleCompra.component.scss'],
})
export class SolicitudDetalleCompraComponent implements OnInit {
  page!: number;
  solicitudDetalleCompras: any = CompraDetalleSolicitudCompra;
  detalleSeleccionado!: CompraDetalleSolicitudCompra;

  constructor(
    private detalleCompraService: CompraSolicitudCompraDetalleService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.detalleCompraService
      .getSolicitudDetalleCompras()
      .pipe(
        tap((solicitudDetalleCompras) => {
          console.log('Service: tap 3');
          solicitudDetalleCompras.forEach((solicitudDetalleCompra) => {
            console.log(solicitudDetalleCompra.id);
          });
        })
      )
      .subscribe(
        (solicitudDetalleCompras) =>
          (this.solicitudDetalleCompras = solicitudDetalleCompras)
      );

      this.modalService.notificarUpload.subscribe((solicitudDetalleCompra) => {
        this.solicitudDetalleCompras = this.solicitudDetalleCompras.map((solicitudDetalleCompraOriginal: { id: any }) => {
          if (solicitudDetalleCompra.id == solicitudDetalleCompraOriginal.id) {
            solicitudDetalleCompraOriginal.id = solicitudDetalleCompra.id;
          }
          return solicitudDetalleCompraOriginal;
        });
      });
  }

  delete(solicitudDetalleCompra: CompraDetalleSolicitudCompra): void {
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
        text: `¿Seguro que desea eliminar el detalle de solicitud de compra ${solicitudDetalleCompra.id}?`,
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
          this.detalleCompraService
            .delete(solicitudDetalleCompra.id)
            .subscribe((response) => {
              this.solicitudDetalleCompras =
                this.solicitudDetalleCompras.filter(
                  (cli: CompraDetalleSolicitudCompra) =>
                    cli !== solicitudDetalleCompra
                );
              swal.fire(
                'Cliente Eliminado',
                `Cliente ${solicitudDetalleCompra.id} eliminado con éxito.`,
                'success'
              );
            });
        }
      });
  }

  abrirModal(detalle: CompraDetalleSolicitudCompra) {
    this.detalleSeleccionado = detalle;
    this.modalService.abrirModal();
  }

}
