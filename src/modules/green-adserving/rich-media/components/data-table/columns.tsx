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

import { RichMediaInterface } from '../../interfaces/rich-media.interface';

import { ScriptDialog } from '../ScriptDialog';

export const columns: ColumnDef<RichMediaInterface>[] = [
  {
    accessorKey: 'richMediaName',
    header: () => 'Nombre Rich Media',
    cell: ({ row }) => {
      const name = row.getValue('richMediaName') as string;
      return <div className="text-center">{name}</div>;
    },
  },
  {
    accessorKey: 'campaign',
    header: () => 'Campaña',
    cell: ({ row }) => {
      return <div className="text-center">{row.original.campaign.name}</div>;
    },
  },
  {
    accessorKey: 'script',
    header: () => 'Ver Script',
    cell: ({ row }) => <ScriptDialog richMediaData={row} />,
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
