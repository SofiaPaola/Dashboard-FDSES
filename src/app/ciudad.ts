import { Clima } from './clima';
import { Departamento } from './departamento';

export class Ciudad {
    id!: number;
    nombre!: string;
    id_departamento!: Departamento;
    altitud!: string;
    clima!: Clima;
}
