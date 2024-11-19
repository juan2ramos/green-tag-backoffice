import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { CreativesWithOutCompensationResponse } from '../../interfaces/types';
import { SortedIcon } from './sortedIcon';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { formatNumber } from '@/shared/helpers/format-number';

export const columns: ColumnDef<CreativesWithOutCompensationResponse>[] = [
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
    accessorKey: 'day',
    header: ({ column }) => {
      return (
        <div
          className=" justify-center flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Día
          {<SortedIcon isSorted={column.getIsSorted()} />}
        </div>
      );
    },
    cell: ({ row }) => {
      const day = row.original.day;
      const formattedDay = format(new Date(day), 'PPP', { locale: es });

      return <div className=" text-center">{formattedDay}</div>;
    },
  },
  {
    accessorKey: 'impressionsLeftToCompensate',
    header: 'Impresiones',
    cell: ({ row }) => {
      const impressions = row.getValue('impressionsLeftToCompensate') as number;
      return (
        <div className="text-center font-robotoFlex font-thin">
          {formatNumber(impressions)}
        </div>
      );
    },
  },
  {
    accessorKey: 'emissionsLeftToCompensate',

    header: ({ column }) => {
      return (
        <div
          className=" justify-center flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Emisiones
          {<SortedIcon isSorted={column.getIsSorted()} />}
        </div>
      );
    },
    cell: ({ row }) => {
      const emissions = parseFloat(
        row.getValue('emissionsLeftToCompensate') as string,
      );
      return (
        <div className="text-center font-robotoFlex font-thin">
          {formatNumber(emissions)}
        </div>
      );
    },
  },
];
