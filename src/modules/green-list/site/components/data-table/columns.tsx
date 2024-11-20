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

import { Checkbox } from '@/components/ui/checkbox';
import { SitesInterface } from '@/modules/green-list/site/interfaces/sites.interface';
import { format, parseISO } from 'date-fns';
export const columns: ColumnDef<SitesInterface>[] = [
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
    accessorKey: 'url',
    header: () => 'URL',
    cell: ({ row }) => {
      const url = row.getValue('url') as string;
      return <div className="text-center">{url}</div>;
    },
  },
  {
    accessorKey: 'category',
    header: () => 'Categoría',
    cell: ({ row }) => {
      const category = row.getValue('category') as string;
      return <div className="text-center">{category}</div>;
    },
  },
  {
    accessorKey: 'isGreen',
    header: () => '¿Green?',
    cell: ({ row }) => {
      const isGreen = row.getValue('isGreen');

      return (
        <div className="text-center">{isGreen === true ? 'Sí' : 'No'}</div>
      );
    },
  },
  {
    accessorKey: 'score',
    header: () => 'Score',
    cell: ({ row }) => {
      const score = row.getValue('score') as string;
      return (
        <div className="text-center font-thin font-robotoFlex">{score}</div>
      );
    },
  },

  {
    accessorKey: 'evaluated',
    header: () => 'Fechas  evaluación',
    cell: ({ row }) => {
      const evaluated = row.getValue('evaluated') as string;
      const evaluatedDate = parseISO(evaluated);
      return (
        <div className="text-center font-thin font-robotoFlex">
          {format(evaluatedDate, 'dd-MM-yyyy')}
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
              <DropdownMenuItem>Editar</DropdownMenuItem>

              <DropdownMenuItem>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
