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

import { Bonus } from '../../interfaces/create-bonus.interface';
import { formatNumber } from '@/shared/helpers/format-number';

export const columns: ColumnDef<Bonus>[] = [
  {
    accessorKey: 'projectName',
    header: () => 'Proyecto',
    cell: ({ row }) => {
      return <div className="text-center">{row.original.project?.name}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'co2Total',
    header: 'CO2 Inicial',
    cell: ({ row }) => {
      const co2Total = row.original.co2Total;

      return (
        <div className="text-center font-robotoFlex font-thin">
          <span className="truncate-text">{formatNumber(co2Total)}Kg</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'co2Compensated',
    header: () => {
      return <div>CO2 utilizado</div>;
    },
    cell: ({ row }) => {
      const co2Compensated = row.getValue('co2Compensated') as string;
      return (
        <div className="text-center font-robotoFlex font-thin">
          {+co2Compensated}Kg
        </div>
      );
    },
  },
  {
    accessorKey: 'agencyName',
    header: 'co2Total',
    cell: ({ row }) => {
      const co2Total = row.getValue('co2Total') as string;
      return (
        <div className="text-center font-robotoFlex font-thin">
          {formatNumber(+co2Total)}Kg
        </div>
      );
    },
  },
  {
    accessorKey: 'url',
    header: 'Link Bono padre',
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
    accessorKey: 'urlBlockchain',
    header: 'Link Blockchain',
    cell: ({ row }) => {
      const urlBlockchain = row.getValue('urlBlockchain') as string;
      return (
        <a href={urlBlockchain} target="blank">
          <Link1Icon className="h-5 w-5 mx-auto" />
        </a>
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
