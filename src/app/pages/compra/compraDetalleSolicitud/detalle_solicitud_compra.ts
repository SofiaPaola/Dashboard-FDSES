import { CompraSolicitudCompra } from "./solicitud_compra";
import { CompraElemento } from "../elemento";
import { CentroCosto } from "../centro_costo";
import { Estado } from "../estado";
import { Unidad } from "../unidad";
import { Usuario } from '../../../auth/usuario';
import { ItemDetalleSolicitudCompra } from './item_detalle_solicitud_compra';

export class CompraDetalleSolicitudCompra {
  id!: number;
  solicitudes!: CompraSolicitudCompra;
  proveedor_sugerido!: string;
  especificaciones_tecnicas!: string;
  estados!: Estado;
  cantidad!: string;
  elementos!: CompraElemento;
  fecha_necesidad!: string;
  centros_costo!: CentroCosto;
  programado!: string;
  unidades!: Unidad;
  items: Array<ItemDetalleSolicitudCompra> = [];
}

