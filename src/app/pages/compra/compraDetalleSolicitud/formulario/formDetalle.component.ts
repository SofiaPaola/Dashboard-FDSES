import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CompraSolicitudCompraDetalleService } from '../compraSolicitudCompraDetalle.service';
import { CompraDetalleSolicitudCompra } from '../detalle_solicitud_compra';

@Component({
  selector: 'ngx-formCliente',
  templateUrl: './formDetalle.component.html',
})
export class FormDetalleComponent implements OnInit {
  public solicitudDetalleCompra: CompraDetalleSolicitudCompra =
    new CompraDetalleSolicitudCompra();

  titulo: string = 'Crear / Editar Detalle Solicitud de Compra';

  errores!: string[] | any;

  constructor(
    private detalleCompraService: CompraSolicitudCompraDetalleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      let id = +params.get('id');
      if (id) {
        this.detalleCompraService
          .getSolicitudDetalleCompra(id)
          .subscribe(
            (solicitudDetalleCompra) =>
              (this.solicitudDetalleCompra = solicitudDetalleCompra)
          );
      }
    });
  }

  create(): void {
    console.log(this.solicitudDetalleCompra);
    this.detalleCompraService.create(this.solicitudDetalleCompra).subscribe(
      (solicitudDetalleCompra) => {
        this.router.navigate(['/pages/compra/solicitudDetalleCompra']);
        swal.fire(
          'Nueva Solicitud de compra',
          `El cliente ${solicitudDetalleCompra.id} ha sido creado con éxito`,
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
    console.log(this.solicitudDetalleCompra);
    this.detalleCompraService.update(this.solicitudDetalleCompra).subscribe(
      (json) => {
        this.router.navigate(['/pages/compra/solicitudDetalleCompra']);
        swal.fire(
          'Solicitud de compra actualizada',
          `${json.mensaje}: ${json.solicitudDetalleCompra.id}`,
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
}
