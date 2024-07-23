import { ColumnDef } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { DotsHorizontalIcon, Link1Icon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { CampaignInterface } from '../../interfaces/campaign.interface';
import { Link } from 'react-router-dom';
export const columns: ColumnDef<CampaignInterface>[] = [
  {
    accessorKey: 'name',
    header: () => 'Campaña',
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      return <div className="text-center">{name}</div>;
    },
  },
  {
    accessorKey: 'client',
    header: () => 'Cliente',
    cell: ({ row }) => {
      const clientName = row.original.client.name;
      return <div className="text-center">{clientName}</div>;
    },
  },
  {
    accessorKey: 'creative',
    header: () => 'Creativo',
    cell: () => {
      return <Link1Icon className="h-5 w-5  mx-auto" />;
    },
  },
  {
    accessorKey: 'vast',
    header: () => 'Archivo VAST',
    cell: () => {
      return <Link1Icon className="h-5 w-5  mx-auto" />;
    },
  },
  {
    accessorKey: 'report',
    header: () => 'Reporte de sitios',
    cell: () => {
      return <Link1Icon className="h-5 w-5  mx-auto" />;
    },
  },

  {
    id: 'actions',
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const campaignId = row.original.id;
      return (
        <div className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link
                  className="w-full"
                  to={`/green-list/campaigns/${campaignId}`}
                >
                  Editar
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
