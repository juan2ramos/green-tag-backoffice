export const routes = [
  {
    path: 'green-tag',
    to: '/green-tag/agencies',
    text: 'GreenTag',
    children: [
      { to: '/green-tag/agencies', text: 'Agencias' },
      { to: '/green-tag/advertisers', text: 'Anunciantes' },
      { to: '/green-tag/compensation', text: 'Compensar' },
      { to: '/green-tag/report', text: 'Reportes' },
      { to: '/green-tag/bonos', text: 'Bonos' },
      /*  { to: '/green-tag/users', text: 'Usuarios' }, */
    ],
  },
  {
    path: 'green-list',
    to: '/green-list/sites',
    text: 'GreenList',
    children: [
      { to: '/green-list/sites', text: 'Sitios' },
      { to: '/green-list/campaigns', text: 'Campañas' },
    ],
  },
  {
    path: 'green-adserving',
    to: '/green-adserving/videos',
    text: 'GreenAdServing',
    children: [
      { to: '/green-adserving/videos', text: 'Videos' },
      { to: '/green-adserving/rich-media', text: 'Rich Media' },
    ],
  },
];
export interface Menu {
  to: string;
  text: string;
  children?: Child[];
}

export interface Child {
  to: string;
  text: string;
}
