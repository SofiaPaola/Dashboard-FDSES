import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ModalService } from '../../modal.service';
import { AuthService } from 'src/app/auth/auth.service';

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

  filterpost = '';

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public modalService: ModalService
  ) // private service: SmartTableData
  {
    // this.source = new LocalDataSource();
    // this.clienteService.getClientes().forEach((data: any[]) => {
    //   this.source.load(data);
    // });
  }

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
  }

  // settings = {
  //   add: {
  //     addButtonContent: '<nb-icon  icon="plus-outline"></nb-icon>',
  //     createButtonContent: '<nb-icon  icon="checkmark-outline"></nb-icon>',
  //     cancelButtonContent: '<nb-icon  icon="close-outline"></nb-icon>',
  //   },
  //   edit: {
  //     editButtonContent: '<nb-icon  icon="edit-outline"></nb-icon>',
  //     saveButtonContent: '<nb-icon  icon="checkmark-outline"></nb-icon>',
  //     cancelButtonContent: '<nb-icon  icon="close-outline"></nb-icon>',
  //   },
  //   delete: {
  //     deleteButtonContent: '<nb-icon  icon="trash-2-outline"></nb-icon>',
  //     confirmDelete: true,
  //   },
  //   columns: {
  //     id: {
  //       title: 'ID',
  //       type: 'number',
  //     },
  //     nombre: {
  //       title: 'Nombre',
  //       type: 'string',
  //     },
  //     docuemnto: {
  //       title: 'Docuemnto',
  //       type: 'string',
  //     },
  //     email: {
  //       title: 'Email',
  //       type: 'string',
  //     },
  //     telefono: {
  //       title: 'Telefono',
  //       type: 'string',
  //     },
  //     celular: {
  //       title: 'Celular',
  //       type: 'string',
  //     },
  //     direccion: {
  //       title: 'Direccion',
  //       type: 'string',
  //     },
  //   },
  // };

  // source: LocalDataSource = new LocalDataSource();

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

  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
