import { Input } from '@/components/ui/input';
import { Control, useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { FormDataSchema } from '../../../interfaces/schema-form';
interface Props {
  control: Control<FormDataSchema>;
}
export const Xandr = ({ control }: Props) => {
  const { setValue } = useFormContext<FormDataSchema>();

  useEffect(() => {
    setValue('compensationStrategies.Xandr.name', 'Xandr');
  }, [setValue]);
  return (
    <div className="my-2 flex flex-col gap-1">
      <FormField
        control={control}
        name="compensationStrategies.Xandr.name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input {...field} value="Xandr" type="hidden" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="compensationStrategies.Xandr.additionalData.username"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input {...field} placeholder="Usuario de la plataforma" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        defaultValue=""
        name="compensationStrategies.Xandr.additionalData.password"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input {...field} type="password" placeholder="Contraseña" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
