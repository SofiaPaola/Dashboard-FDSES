import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ModalService } from '../../../modal.service';
//import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'ngx-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  clientes: any = Cliente;
  page!: number;
  clienteSeleccionado!: Cliente;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    //public authService: AuthService,
    public modalService: ModalService
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
      this.clientes = this.clientes.map((clienteOriginal: { id: any; }) => {
        if (cliente.id == clienteOriginal.id) {
          clienteOriginal.id = cliente.id;
        }
        return clienteOriginal;
      });
    });
  }

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
            this.clientes = this.clientes.filter((cli: Cliente) => cli !== cliente);
            swal.fire(
              'Cliente Eliminado',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            );
          });
        }
      });
  }

  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
