import { CompraSolicitudCompra } from "./solicitud_compra";
import { CompraElemento } from "../elemento";
import { Unidad } from "../unidad";

export class CompraDetalleSolicitudCompra {
  id!: number;
  elemento!: CompraElemento;
  solicitud_compra!: CompraSolicitudCompra;
  proveedor_sugerido!: string;
  especificaciones_tecnicas!: string;
  //id_estado
  cantidad: number = 1;
  fecha_necesidad!: string;
  //id_centro_costo
  programado!: string;
  unidad!: Unidad;
}
