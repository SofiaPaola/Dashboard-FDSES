import { TipoDocumento } from "../../tipo_documento";
import { Ciudad } from "../../ciudad";
export class Vendedor {
    id!: number;
    documento!: string;
    nombre!: string;
    direccion!: string;
    telefono!: string;
    celular!: string;
    email!: string;
    fecha_ingreso!: string;
    activo!: string;
    ciudad!: Ciudad;
    tipo_documento!: TipoDocumento;
    observaciones!: string;

}
