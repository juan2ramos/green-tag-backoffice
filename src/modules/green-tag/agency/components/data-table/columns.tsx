import { ColumnDef } from '@tanstack/react-table';
import {
  Agency,
  CompensationStrategiesEntity,
} from '../../interfaces/agency.interface';
import { dateDisplay } from '@/shared/helpers/date-display';
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
import { Badge } from '@/components/ui/badge';
type BadgeVariant =
  | 'outline'
  | 'destructive'
  | 'default'
  | 'secondary'
  | 'active'
  | 'inactive'
  | 'Equativ'
  | 'Xandr'
  | 'Email';
export const columns: ColumnDef<Agency>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      return (
        <div className="text-center" key={name}>
          {name}
        </div>
      );
    },
  },
  {
    accessorKey: 'active',
    header: 'Estado',

    cell: ({ row }) => {
      const status = row.getValue('active') ? 'Activa' : 'Inactiva';

      const variant: BadgeVariant =
        (
          {
            Activa: 'active',
            Inactiva: 'inactive',
          } as Record<string, BadgeVariant>
        )[status] ?? 'default';

      return (
        <div className="text-center">
          <Badge className="capitalize text-center" variant={variant}>
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'compensationStrategies',
    header: 'Plataformas de compensación',
    cell: ({ row }) => {
      const strategies: CompensationStrategiesEntity[] = row.getValue(
        'compensationStrategies',
      );
      const variantArray = {
        Equativ: 'Equativ',
        Xandr: 'Xandr',
        Email: 'Email',
      } as Record<string, BadgeVariant>;

      const strategiesString = strategies.map(
        (strategy: CompensationStrategiesEntity) => {
          const name = strategy.name;
          const variant = variantArray[name] ?? 'default';
          return (
            <Badge
              key={name}
              className="capitalize text-center mx-1"
              variant={variant}
            >
              {name}
            </Badge>
          );
        },
      );

      return <div className="text-center capitalize">{strategiesString}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Fecha de creación',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as string;
      const formatted = dateDisplay(date);

      return <div className="text-center">{formatted}</div>;
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
