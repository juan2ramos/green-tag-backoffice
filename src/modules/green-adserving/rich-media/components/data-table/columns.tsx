import { ColumnDef } from '@tanstack/react-table';

import { RichMediaInterface } from '../../interfaces/rich-media.interface';

import { ScriptDialog } from '../ScriptDialog';
import ActionsCell from '../actions-cell';

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
    cell: ({ row }) => {
      return <ActionsCell id={row.original.id} />;
    },
  },
];
