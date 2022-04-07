import { Clima } from './clima';
import { Departamento } from './departamento';

export class Ciudad {
    id!: number;
    nombre!: string;
    departamento!: Departamento;
    altitud!: string;
    clima!: Clima;
}
