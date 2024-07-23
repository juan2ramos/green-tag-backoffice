import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { SortDirection } from '@tanstack/react-table';
export const SortedIcon = ({
  isSorted,
}: {
  isSorted: SortDirection | false;
}) => {
  if (isSorted === 'asc') return <ChevronUpIcon className="h-4 w-4" />;
  if (isSorted === 'desc') return <ChevronDownIcon className="h-4 w-4" />;
  return null;
};
