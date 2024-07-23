import { DateTime } from 'luxon';
export const dateDisplay = (date: string) => {
  const string = DateTime.fromISO(date).setLocale('es').toFormat('dd MMM yyyy');
  const parts = string.split(' ');
  parts[1] = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
  return parts.join(' ');
};
