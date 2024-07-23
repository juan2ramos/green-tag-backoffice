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
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ClientInterface } from '../../interfaces/client.interface';
import { dateDisplay } from '@/shared/helpers/date-display';

export const columns: ColumnDef<ClientInterface>[] = [
  {
    accessorKey: 'name',
    header: () => 'Campaña',
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      return <div className="text-center">{name}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => 'Fecha de creación',
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt') as string;
      const formatted = dateDisplay(createdAt);
      return (
        <div className="text-center font-robotoFlex  font-thin">
          {formatted}
        </div>
      );
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
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText('payment-id');
                  toast('Payment ID copied to clipboard', {
                    position: 'top-right',
                    duration: 3000,
                  });
                }}
              >
                Editar
              </DropdownMenuItem>

              <DropdownMenuItem>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
