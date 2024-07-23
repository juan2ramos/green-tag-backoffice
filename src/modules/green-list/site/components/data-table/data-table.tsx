import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  Updater,
  PaginationState,
} from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize: number;
  totalRecords: number;
  page: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  sortBy: string;
  sortOrder: string;
  onSortChange: (sortBy: string, sortOrder: string) => void;
}
export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize,
  totalRecords,
  page,
  onPageChange,
  onPageSizeChange,
  sortBy,
  sortOrder,
  onSortChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalRecords / pageSize),
    state: {
      pagination: {
        pageIndex: page - 1, // Adjusting for 0-based index
        pageSize,
      },
      sorting: [{ id: sortBy, desc: sortOrder === 'desc' }],
    },
    onPaginationChange: (updaterOrValue: Updater<PaginationState>) => {
      if (typeof updaterOrValue === 'function') {
        const { pageIndex, pageSize } = updaterOrValue({
          pageIndex: table.getState().pagination.pageIndex,
          pageSize: table.getState().pagination.pageSize,
        });
        onPageChange(pageIndex + 1); // Adjusting for 1-based index
        onPageSizeChange(pageSize);
      } else {
        const { pageIndex, pageSize } = updaterOrValue;
        onPageChange(pageIndex + 1); // Adjusting for 1-based index
        onPageSizeChange(pageSize);
      }
    },
    onSortingChange: (sorting) => {
      const sort = Array.isArray(sorting) ? sorting[0] : null;
      if (sort) onSortChange(sort.id, sort.desc ? 'desc' : 'asc');
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
  });

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-[#F9FBFC] border-b-4"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className=" text-center text-[14px] font-[600]"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="bg-[#ffffff] leading-[32px] cursor-pointer hover:bg-[#f6f6fc] transition-colors duration-200 border-[#F9FBFC] border-b-4"
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center pt-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{' '}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
        </div>
        <div className="flex gap-2 items-center">
          <Select
            onValueChange={(value) => {
              table.setPageSize(+value);
            }}
          >
            <SelectTrigger className="w-[80px] bg-[white]">
              <SelectValue defaultValue={10} placeholder={10} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
