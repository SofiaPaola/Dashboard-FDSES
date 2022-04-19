import { Component, Input, OnInit} from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../modal.service';
//import { AuthService } from '../../usuarios/auth.service';
import swal from 'sweetalert2';
import { NbDialogRef } from '@nebular/theme';
import { FacturaService } from '../../factura/services/factura.service';
import { Factura } from '../../factura/models/factura';

@Component({
  selector: 'ngx-detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  @Input() cliente!: Cliente;
  titulo: string = "Detalle del Cliente";
  

  constructor(private clienteService: ClienteService, 
    private activatedRoute: ActivatedRoute,
    //private authService:AuthService,
    public modalService: ModalService,
    public facturaService: FacturaService,
    protected ref: NbDialogRef<DetalleComponent>
    ) { }

  ngOnInit(): void { }

  cerrarModalDetalle() {
    this.modalService.cerrarModal();
  }

  delete(factura: Factura): void{
    const swalfire = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalfire.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar la factura ${factura.descripcion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.facturaService.delete(factura.id).subscribe(
          response => {
            this.cliente.facturas = this.cliente.facturas.filter((f: Factura) => f !== factura)
            swal.fire(
              'Factura Eliminado',
              `Factura ${factura.descripcion} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    });
  }

  dismiss() {
    this.ref.close();
  }

}

