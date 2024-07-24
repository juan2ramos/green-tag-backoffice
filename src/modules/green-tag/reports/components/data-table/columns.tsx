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

import { ReportInterface } from '../../interfaces/report.interface';
export const columns: ColumnDef<ReportInterface>[] = [
  {
    accessorKey: 'campaignName',
    header: () => 'Campaña',
    cell: ({ row }) => {
      const campaignName = row.getValue('campaignName') as string;
      return (
        <div className="text-center" title={campaignName}>
          <span className="truncate-text">{campaignName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'agencyName',
    header: () => 'Agencia',
    cell: ({ row }) => {
      const agencyName = row.getValue('agencyName') as string;
      return <div className="text-center">{agencyName}</div>;
    },
  },
  {
    accessorKey: 'platform',
    header: () => 'Plataforma',
    cell: ({ row }) => {
      const platform = row.getValue('platform') as string;
      return <div className="text-center">{platform}</div>;
    },
  },
  {
    accessorKey: 'advertiserName',
    header: () => 'Anunciante',
    cell: ({ row }) => {
      const advertiserName = row.getValue('advertiserName') as string;
      return <div className="text-center">{advertiserName}</div>;
    },
  },
  {
    accessorKey: 'dateRange',
    header: () => 'Fechas',
    cell: ({ row }) => {
      const dateRange = row.getValue('dateRange') as string;
      return <div className="text-center">{dateRange}</div>;
    },
  },
  {
    accessorKey: 'numberCompensatedEmissions',
    header: () => 'Emisiones CO₂',
    cell: ({ row }) => {
      const emissions = row.getValue('numberCompensatedEmissions') as string;
      return (
        <div className="text-center font-robotoFlex font-thin">
          {emissions}Kg
        </div>
      );
    },
  },

  {
    accessorKey: 'impressions',
    header: () => 'Impresiones',
    cell: ({ row }) => {
      const impressions = row.getValue('impressions') as string;
      return <div className="text-center">{impressions}</div>;
    },
  },
  {
    accessorKey: 'url',
    header: () => 'Bono',
    cell: ({ row }) => {
      const url = row.getValue('url') as string;
      return (
        <div className="text-center">
          <a
            href={`https://green-tag-tty.s3.amazonaws.com/${url}`}
            target="_blank"
            rel="noreferrer"
          >
            <Link1Icon className="h-5 w-5  mx-auto" />
          </a>
        </div>
      );
    },
  },
];
