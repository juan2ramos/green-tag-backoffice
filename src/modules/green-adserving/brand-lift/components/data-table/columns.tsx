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
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { BrandLiftInterface } from '../../interfaces/brandLift.interface';

export const columns: ColumnDef<BrandLiftInterface>[] = [
  {
    accessorKey: 'name',
    header: () => 'Nombre Rich Media',
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      return <div className="text-center">{name}</div>;
    },
  },
  {
    accessorKey: 'campaign',
    header: () => 'Campaña',
    cell: ({ row }) => {
      const campaign = row.getValue('campaign') as string;
      return <div className="text-center">{campaign}</div>;
    },
  },
  {
    accessorKey: 'template',
    header: () => 'Plantilla',
    cell: ({ row }) => {
      const campaign = row.getValue('campaign') as string;
      return <div className="text-center">{campaign}</div>;
    },
  },
  {
    accessorKey: 'download',
    header: () => 'Descargar',
    cell: ({ row }) => {
      const campaign = row.getValue('campaign') as string;
      return <div className="text-center">{campaign}</div>;
    },
  },

  {
    id: 'actions',
    accessorKey: 'actions',
    header: 'Acciones',
    cell: () => {
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
              <DropdownMenuItem></DropdownMenuItem>

              <DropdownMenuItem>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
