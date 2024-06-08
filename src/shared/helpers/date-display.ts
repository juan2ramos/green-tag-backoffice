import { DateTime } from 'luxon';
export const dateDisplay = (date: string) => {
  return DateTime.fromISO(date)
    .setLocale('es')
    .toFormat("dd 'de' LLLL 'de' yyyy");
};
