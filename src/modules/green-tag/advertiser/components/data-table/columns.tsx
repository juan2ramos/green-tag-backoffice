import { ColumnDef } from '@tanstack/react-table';

import { CompensationStrategiesEntity } from '@/modules/green-tag/agency/interfaces/agency.interface';
import { CheckboxCell } from './CheckboxCell';

export const columns: ColumnDef<CompensationStrategiesEntity>[] = [
  {
    accessorKey: 'active',
    header: 'Activo',
    cell: ({ row }) => <CheckboxCell advertiserData={row} />,
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      return <div className="text-center">{name}</div>;
    },
  },
  {
    accessorKey: 'id',
    header: 'Id Plataforma',
    cell: ({ row }) => {
      const id = row.getValue('id') as string;
      return <div className="text-center">{id}</div>;
    },
  },
];
