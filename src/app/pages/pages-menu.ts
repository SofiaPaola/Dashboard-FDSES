import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Mantenimiento',
    icon: 'settings-2-outline',
    children: [
      {
        title: 'Clientes',
        icon: 'people-outline',
        link: '/pages/mantenimiento/clientes',
      },
      {
        title: 'Proveedores',
        icon: 'car-outline',
        link: '/pages/mantenimiento/proveedores',
      },
      {
        title: 'Vendedores',
        icon: 'shopping-cart-outline',
        link: '/pages/mantenimiento/vendedores',
      },
    ],
  },
  {
    title: 'Compras',
    icon: 'shopping-bag-outline',
    children: [
      {
        title: 'Detalle De Solicitud Compra',
        link: '/pages/compra/solicitudDetalleCompra'
      },
    ]
  },
  {
    title: 'Laboratorio',
    icon: 'info-outline',
    link: '/pages/laboratorio',
  },
];
