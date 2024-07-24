import { Input } from '@/components/ui/input';

import { Control, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { FormDataSchema } from '../../../interfaces/schema-form';
import { useEffect } from 'react';
interface Props {
  control: Control<FormDataSchema>;
}
export const Equativ = ({ control }: Props) => {
  const { setValue } = useFormContext<FormDataSchema>();

  useEffect(() => {
    setValue('compensationStrategies.Equativ.name', 'Equativ');
  }, [setValue]);

  return (
    <div className="my-2 flex flex-col gap-1">
      <FormField
        control={control}
        name="compensationStrategies.Equativ.name"
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
        name="compensationStrategies.Equativ.additionalData.username"
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
        name="compensationStrategies.Equativ.additionalData.password"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input {...field} type="password" placeholder="Contraseña" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="compensationStrategies.Equativ.additionalData.client_id"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input {...field} type="password" placeholder="Client ID" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="compensationStrategies.Equativ.additionalData.client_secret"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input {...field} type="password" placeholder="Client Secret" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
