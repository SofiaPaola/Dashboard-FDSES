import { Cliente } from "src/app/pages/mantenimiento/cliente/cliente";

export abstract class SmartTableData {
  abstract getData(): any[];
  abstract getClientes(): Cliente[];
}
