import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalService } from 'src/app/pages/modal.service';
import { CompraSolicitudCompraDetalleService } from '../compraSolicitudCompraDetalle.service';
import { CompraDetalleSolicitudCompra } from '../detalle_solicitud_compra';

@Component({
  selector: 'detalle-compra',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() solicitudDetalleCompra!: CompraDetalleSolicitudCompra;
  titulo: string = 'Solicitud Compra';

  constructor(
    private detalleCompraService: CompraSolicitudCompraDetalleService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public modalService: ModalService,
  ) {}

  ngOnInit(): void {}

  cerrarModal() {
    this.modalService.cerrarModal();
  }

}
