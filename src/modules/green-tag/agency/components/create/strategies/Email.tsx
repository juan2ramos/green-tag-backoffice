import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control, useFormContext } from 'react-hook-form';
import { FormDataSchema } from '../../../interfaces/schema-form';
import { useEffect } from 'react';

interface EmailProps {
  control: Control<FormDataSchema>;
}

export const Email = ({ control }: EmailProps) => {
  const { setValue } = useFormContext<FormDataSchema>();

  useEffect(() => {
    setValue('compensationStrategies.Email.name', 'Email');
  }, [setValue]);
  return (
    <div className="my-2 flex flex-col gap-1">
      <FormField
        control={control}
        name="compensationStrategies.Email.name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input {...field} value="Equativ" type="hidden" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        defaultValue=""
        name="compensationStrategies.Email.additionalData.email"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                type="email"
                placeholder="Correo desde el que se enviará el reporte"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
