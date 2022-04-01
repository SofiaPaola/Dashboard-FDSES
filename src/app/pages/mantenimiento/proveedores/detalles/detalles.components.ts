import { Component, Input, OnInit } from '@angular/core';
import { Proveedor } from '../proveedor';
import { ProveedorService } from '../proveedor.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../../modal.service';

@Component({
  selector: 'detalle-proveedor',
  templateUrl: './detalles.components.html',
  styleUrls: ['./detalles.components.css']
})
export class DetallesComponents implements OnInit {

  @Input() proveedor: Proveedor;
  titulo: string = "Detalle del Proveedor";

  constructor(private proveedorService: ProveedorService,
    private activatedRoute: ActivatedRoute,
    public modalService: ModalService) { }

  ngOnInit(): void { }

  cerrarModal() {
    this.modalService.cerrarModal();
  }

}
