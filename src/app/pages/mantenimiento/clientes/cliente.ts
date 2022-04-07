import { TipoDocumento } from "../tipo_documento";
import { Ciudad } from "../ciudad";
import { Factura } from '../facturas/models/factura';

export class Cliente {
    id!: number;
    documento!: string;
    nombre!: string;
    contacto!: string;
    cargo!: string;
    direccion!: string;
    telefono!: string;
    telefono1!: string;
    celular!: string;
    email!: string;
    fecha_ingreso!: string;
    ciudad!: Ciudad;
    tipo_documento!: TipoDocumento;
    observaciones!: string;
    facturas: Array<Factura> = [];
}
