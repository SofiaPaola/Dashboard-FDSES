export class Usuario {
  id!: number;
  username!: string;
  password!: string;
  nombre!: string;
  //fecha_ultimo_ingreso: string;
  //fecha_activacion_inicial: string;
  //fecha_activacion_final: string;
  roles: string[] = [];
}
