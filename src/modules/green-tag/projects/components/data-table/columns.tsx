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
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

import { ProjectInterface } from '../../interfaces/project';

export const columns: ColumnDef<ProjectInterface>[] = [
  {
    accessorKey: 'name',
    header: () => 'Proyecto',
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      return <div className="text-center">{name}</div>;
    },
  },
  {
    accessorKey: 'url',
    header: 'Link',
    cell: ({ row }) => {
      const url = row.getValue('url') as string;

      return (
        <a href={url}>
          <Link1Icon className="h-5 w-5  mx-auto" />
        </a>
      );
    },
  },
  {
    accessorKey: 'logo',
    header: 'Logo',
    cell: ({ row }) => {
      const image = row.getValue('logo') as string;

      return (
        <img
          src={`https://green-tag-tty.s3.amazonaws.com/${image}`}
          className="mx-auto"
          width={40}
        />
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
