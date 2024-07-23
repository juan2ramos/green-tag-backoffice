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

import { Checkbox } from '@/components/ui/checkbox';
import { DataTableProps } from '../../interfaces/types';
import { SortedIcon } from './sortedIcon';

export const columns: ColumnDef<DataTableProps>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="text-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'campaignName',
    header: 'Campaña',
    cell: ({ row }) => {
      const campaignId = row.original.campaignId;
      const campaignName = row.getValue('campaignName') as string;
      return (
        <div className="text-center" key={campaignId} title={campaignName}>
          <span className="truncate-text">{campaignName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'advertiserName',
    header: ({ column }) => {
      return (
        <div
          className=" justify-center flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Anunciante
          {<SortedIcon isSorted={column.getIsSorted()} />}
        </div>
      );
    },
    cell: ({ row }) => {
      const advertiserName = row.getValue('advertiserName') as string;
      return <div className="text-center">{advertiserName}</div>;
    },
  },
  {
    accessorKey: 'agencyName',
    header: 'Agencia',
    cell: ({ row }) => {
      const agencyName = row.getValue('agencyName') as string;
      const compensationStrategy = row.original.compensationStrategy;
      return (
        <div className="text-center">{`${agencyName} / ${compensationStrategy}`}</div>
      );
    },
  },
  {
    accessorKey: 'impressions',

    header: ({ column }) => {
      return (
        <div
          className=" justify-center flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Impresiones
          {<SortedIcon isSorted={column.getIsSorted()} />}
        </div>
      );
    },
    cell: ({ row }) => {
      const impressions = row.getValue('impressions') as string;
      return (
        <div className="text-center font-robotoFlex font-thin">
          {impressions}
        </div>
      );
    },
  },
  {
    accessorKey: 'emissions',
    header: 'Emisiones CO2',
    cell: ({ row }) => {
      const emissions = row.getValue('emissions') as string;
      return (
        <div className="text-center font-robotoFlex  font-thin">
          {emissions}Kg
        </div>
      );
    },
  },
  {
    accessorKey: 'dateRange',
    header: ({ column }) => {
      return (
        <div
          className=" justify-center flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Fechas
          {<SortedIcon isSorted={column.getIsSorted()} />}
        </div>
      );
    },

    cell: ({ row }) => {
      const dateRange = row.getValue('dateRange') as string;
      return (
        <div className="text-center font-robotoFlex  font-thin">
          {dateRange}
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
