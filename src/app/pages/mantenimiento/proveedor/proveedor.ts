import { Ciudad } from "../ciudad";
import { TipoDocumento } from "../tipo_documento";

export class Proveedor {
  id!: number;
  documento!: string;
  nombre!: string;
  direccion!: string;
  telefono!: string;
  celular!: string;
  contacto!: string;
  cargo!: string;
  email!: string;
  fecha_ingreso!: string;
  ciudad!: Ciudad;
  tipo_documento!: TipoDocumento;
  activo!: number;
  contratista!: string;
  disponibilidad!: number;
  critico!: string;
  archivo_arl!: string;
  afiliado_sgr!: string;
  implementa_sgsst!: string;
  observaciones!: string;
}
