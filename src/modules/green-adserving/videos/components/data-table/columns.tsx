import { ColumnDef } from '@tanstack/react-table';

import { VideoInterface } from '../../interfaces/video.interface';
import ActionsCell from '../actions-cell';
import { CopyIcon, Link1Icon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
//import { formatNumber } from '@/shared/helpers/format-number';
const copyToClipboard = (code: string) => {
  navigator.clipboard.writeText(code).then(() => {
    toast.info('Link copiado', {
      position: 'top-right',
      duration: 10000,
      action: {
        label: 'Cerrar',
        onClick: () => console.log('Undo'),
      },
    });
  });
};
export const columns: ColumnDef<VideoInterface>[] = [
  {
    accessorKey: 'videoName',
    header: () => 'Video',
    cell: ({ row }) => {
      const videoName = row.getValue('videoName') as string;
      return <div className="text-center">{videoName}</div>;
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
    accessorKey: 'videoUrl',
    header: () => 'Creativo',
    cell: ({ row }) => {
      const creative = row.getValue('videoUrl') as string;
      return (
        <a href={creative} target="_blank">
          <Link1Icon className="h-5 w-5  mx-auto" />
        </a>
      );
    },
  },
  {
    accessorKey: 'vastFileUrl',
    header: () => 'Link VAST',
    cell: ({ row }) => {
      const vastURL = row.getValue('vastFileUrl') as string;
      return (
        <button
          className="mx-auto block"
          onClick={() => copyToClipboard(vastURL)}
        >
          <CopyIcon className="h-5 w-5 " />
        </button>
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
    cell: ({ row }) => {
      return <ActionsCell id={row.original.id} />;
    },
  },
];
