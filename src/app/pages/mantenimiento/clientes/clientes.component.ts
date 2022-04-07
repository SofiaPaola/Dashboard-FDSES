import { Component, OnInit, TemplateRef } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ModalService } from '../modal.service';
import { LocalDataSource } from 'ng2-smart-table';
//import { AuthService } from '../usuarios/auth.service';
import { DetalleComponent } from './detalle/detalle.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  clientes: any = Cliente;
  page!: number;
  clienteSeleccionado!: Cliente;
  nuevoCliente!: Cliente;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    //public authService: AuthService,
    public modalService: ModalService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.clienteService
      .getClientes()
      .pipe(
        tap((clientes) => {
          console.log('ClientesComponent: tap 3');
          clientes.forEach((cliente) => {
            console.log(cliente.nombre);
          });
        })
      )
      .subscribe((clientes) => (this.clientes = clientes));

    this.modalService.notificarUpload.subscribe((cliente) => {
      this.clientes = this.clientes.map((clienteOriginal: { id: any }) => {
        if (cliente.id == clienteOriginal.id) {
          clienteOriginal.id = cliente.id;
        }
        return clienteOriginal;
      });
    });

    //this.modalService.notificarNew.subscribe((cliente) => {
    //  this.clientes = this.clientes.map((clienteNuevo: { id: any }) => {
    //    if (cliente.id == clienteNuevo.id) {
    //      clienteNuevo.id = cliente.id;
    //    }
    //    return clienteNuevo;
    //  });
    //});
  }

  source: LocalDataSource = new LocalDataSource();

  delete(cliente: Cliente): void {
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
        text: `¿Seguro que desea eliminar al cliente ${cliente.nombre}?`,
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
          this.clienteService.delete(cliente.id).subscribe((response) => {
            this.clientes = this.clientes.filter(
              (cli: Cliente) => cli !== cliente
            );
            swal.fire(
              'Cliente Eliminado',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            );
          });
        }
      });
  }

  abrirModalNuevoCliente(clientes: Cliente) {
    this.nuevoCliente = clientes;
    this.modalService.abrirModalNuevo();
  }

  

  open() {
    this.dialogService.open(DetalleComponent, {
      context: {
        titulo: 'Detalle Cliente',
      },
    });
  }

}
