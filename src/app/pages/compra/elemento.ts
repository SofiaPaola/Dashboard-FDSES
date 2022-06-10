import { ItemElemento } from './item_elemento';
import { Unidad } from './unidad';

export class CompraElemento {
  id!: number;
  codigo!: number;
  nombre!: string;
  unidades!: Unidad;
  tiempo_vencimiento!: string;
  items: Array<ItemElemento> = [];
  //comp_categoria!:
}
