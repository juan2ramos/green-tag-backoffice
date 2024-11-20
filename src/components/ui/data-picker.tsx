import { cn } from '@/lib/utils';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Locale, format } from 'date-fns';
import { Calendar } from './calendar';
import { DateRange } from 'react-day-picker';
import { es as esLocale } from 'date-fns/locale';

interface DatePickerWithRangeProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  locale?: Locale;
  className?: string;
}

export function DatePickerWithRange({
  date,
  setDate,
  locale = esLocale,
  className,
}: DatePickerWithRangeProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={'outline'}
          className={cn(
            'w-[220px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className || '',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'dd MMM, yyyy', { locale })} -{' '}
                {format(date.to, 'dd MMM, yyyy', { locale })}
              </>
            ) : (
              format(date.from, 'dd MMM, yyyy', { locale })
            )
          ) : (
            <span>Selecciona una fecha</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          locale={locale}
        />
      </PopoverContent>
    </Popover>
  );
}
