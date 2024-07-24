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
import { VideoInterface } from '../../interfaces/video.interface';
//import { formatNumber } from '@/shared/helpers/format-number';

export const columns: ColumnDef<VideoInterface>[] = [
  {
    accessorKey: 'name',
    header: () => 'Video',
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
    accessorKey: 'creativeURL',
    header: () => 'Creativo',
    cell: ({ row }) => {
      const creative = row.getValue('creativeURL') as string;
      return (
        <a href={creative} target="_blank">
          <Link1Icon className="h-5 w-5  mx-auto" />
        </a>
      );
    },
  },
  {
    accessorKey: 'vastURL',
    header: () => 'Archivo VAST',
    cell: ({ row }) => {
      const vastURL = row.getValue('vastURL') as string;
      return (
        <a href={vastURL} target="_blank">
          <Link1Icon className="h-5 w-5  mx-auto" />
        </a>
      );
    },
  },
  /*  {
    accessorKey: 'reproductions',
    header: () => '# reproducciones',
    cell: ({ row }) => {
      const reproductions = row.getValue('reproductions') as string;
      return (
        <div className="text-center font-robotoFlex font-light">
          {formatNumber(+reproductions)}
        </div>
      );
    },
  }, */
  {
    accessorKey: 'dataTransfer',
    header: () => '# transferidos',
    cell: () => {
      return '';
    },
  },
  {
    accessorKey: 'emissions',
    header: () => 'Emisiones CO2',
    cell: () => {
      return (
        <div className="text-center  font-robotoFlex font-light">{''}</div>
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
              <DropdownMenuItem></DropdownMenuItem>

              <DropdownMenuItem>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
