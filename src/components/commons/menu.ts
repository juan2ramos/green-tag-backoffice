export const routes = [
  {
    path: 'green-tag',
    to: '/green-tag/agencies',
    text: 'GreenTag',
    children: [
      { to: '/green-tag/agencies', text: 'Agencias' },
      { to: '/green-tag/advertisers', text: 'Anunciantes' },
      { to: '/green-tag/campaigns', text: 'Obtener datos' },
      { to: '/green-tag/compensation', text: 'Compensar' },
      { to: '/green-tag/reportes', text: 'Reportes' },
      { to: '/green-tag/projects', text: 'Proyectos' },
    ],
  },
  {
    path: 'green-list',
    to: '/green-list/campaigns',
    text: 'GreenList',
    children: [
      { to: '/green-list/campaigns', text: 'Campañas' },
      { to: '/green-list/sites', text: 'Sitios' },
    ],
  },
  {
    path: 'green-adserving',
    to: '/green-adserving/creatives',
    text: 'GreenAdServing',
    children: [{ to: '/green-adserving/creatives', text: 'Creativos' }],
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
