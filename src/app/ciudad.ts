import { Departamento } from './departamento';
import { Clima } from './clima';

export class Ciudad {
    id!: number;
    nombre!: string;
    id_departamento!: Departamento;
    altitud!: string;
    clima!: Clima;
}
