import { Component, OnInit } from '@angular/core';
import { Vendedor } from './vendedor';
import { VendedorService } from './vendedor.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ModalService } from '../../../modal.service';
//import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html'
})
export class VendedoresComponent implements OnInit {
  
  vendedores: any = Vendedor;
  public page!: number;

  vendedorSeleccionado!: Vendedor;

  constructor(
    private vendedorService: VendedorService,
    private activatedRoute: ActivatedRoute,
    //public authService: AuthService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.vendedorService.getVendedores()
      .pipe(
        tap(vendedores => {
          console.log('VendedoresComponent: tap 3');
          vendedores.forEach(vendedor => {
            console.log(vendedor.nombre);
          })
        })
      ).subscribe(vendedores => this.vendedores = vendedores);

    this.modalService.notificarUpload.subscribe(vendedor => {
      this.vendedores = this.vendedores.map((vendedorOriginal: { id: any; }) => {
        if (vendedor.id == vendedorOriginal.id) {
          vendedorOriginal.id = vendedor.id;
        }
        return vendedorOriginal;
      })
    });
  }

  delete(vendedor: Vendedor): void {
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
        text: `¿Seguro que desea eliminar al vendedor ${vendedor.nombre}?`,
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
          this.vendedorService.delete(vendedor.id).subscribe((response) => {
            this.vendedores = this.vendedores.filter((ven: Vendedor) => ven !== vendedor);
            swal.fire(
              'Vendedor Eliminado',
              `Vendedor ${vendedor.nombre} eliminado con éxito.`,
              'success'
            );
          });
        }
      });
  }

  abrirModal(vendedor: Vendedor) {
    this.vendedorSeleccionado = vendedor;
    this.modalService.abrirModal();
  }

}
