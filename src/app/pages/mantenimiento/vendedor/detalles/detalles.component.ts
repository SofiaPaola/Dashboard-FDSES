import { Component, Input, OnInit } from '@angular/core';
import { VendedorService } from '../vendedor.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../../modal.service';
import { Vendedor } from '../vendedor';
//import { AuthService } from '../../../usuarios/auth.service';

@Component({
  selector: 'detalles-vendedor',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
})
export class DetallesComponent implements OnInit {
  @Input() vendedor!: Vendedor;
  titulo: string = 'Detalle del Vendedor';

  constructor(
    private vendedorService: VendedorService,
    private activatedRoute: ActivatedRoute,
    //private authService:AuthService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {}

  cerrarModal() {
    this.modalService.cerrarModal();
  }
}
