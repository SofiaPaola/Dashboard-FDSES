import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean = false; 

  private _notificarUpload = new EventEmitter<any>();

  private _notificarNew = new EventEmitter<any>();

  constructor() { }

  get notificarUpload(): EventEmitter<any> {
    return this._notificarUpload;
  }

  get notificarNew(): EventEmitter<any> {
    return this._notificarNew;
  }

  abrirModal() {
    this.modal = true;
  }

  abrirModalNuevo() {
    this.modal = true;
  }

  cerrarModal() {
    this.modal = false;
  }

  cerrarModalNuevo() {
    this.modal = false;
  }


}
