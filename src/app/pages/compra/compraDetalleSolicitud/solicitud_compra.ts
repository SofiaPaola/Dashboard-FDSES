import { Usuario } from 'src/app/auth/usuario';
import { Estado } from '../estado';

export class CompraSolicitudCompra {
  id!: number;
  usuario!: Usuario;
  estado!: Estado;
  fecha_registro!: string;
}
