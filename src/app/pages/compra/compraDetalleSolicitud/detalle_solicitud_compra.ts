import { CompraSolicitudCompra } from "./solicitud_compra";
import { CompraElemento } from "../elemento";
import { CentroCosto } from "../centro_costo";
import { Estado } from "../estado";
import { ItemElemento } from "../item_elemento";
import { Unidad } from "../unidad";
import { Usuario } from '../../../auth/usuario';

export class CompraDetalleSolicitudCompra {
  id!: number;
  solicitud_compra!: CompraSolicitudCompra;
  proveedor_sugerido!: string;
  especificaciones_tecnicas!: string;
  estados!: Estado;
  elemento!: CompraElemento;
  fecha_necesidad!: string;
  centro_costo!: CentroCosto;
  programado!: string;
  usuario!: Usuario;
  unidad!: Unidad;
  items: Array<ItemElemento> = [];
}

