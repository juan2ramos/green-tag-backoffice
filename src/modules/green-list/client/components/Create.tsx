import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { FormDataSchema, formSchema } from '../interfaces/schema-form';
import { UseCreateClient } from '../hooks/useCreateClient';

export const CreateClient = () => {
  const form = useForm<FormDataSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });
  const { mutation, isLoading: loadingMutate } = UseCreateClient(form);

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutation.mutate(data);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex gap-5 mt-9 mb-4 "
      >
        <div className="w-1/3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Nombre del cliente" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-1/3">
          <Button
            disabled={loadingMutate}
            variant={'create'}
            size={'extraLarge'}
            type="submit"
          >
            Crear cliente
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
};
