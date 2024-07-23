import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Email, Xandr, Equativ } from './strategies';
import { Button } from '@/components/ui/button';

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
  FormField,
} from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { type FormDataSchema, formSchema } from '../../interfaces/schema-form';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import useTransformData from '../../hooks/useTransformData';
//import { useAgencyMutation } from '../hooks/useAgencyMutation';

export const FormCreate = () => {
  //const agencyMutation = useAgencyMutation();
  const { transformData } = useTransformData();
  const form = useForm<FormDataSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      active: true,
      compensationStrategies: {},
      showXandr: false,
      showEmail: false,
      showEquativ: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
    const transformedData = transformData(values);
    console.log(transformedData);
    // agencyMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-8"
      >
        <div className="flex gap-6 items-center  ">
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ingresa el nombre de la agencia"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-1/3 flex items-center gap-3 ">
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <Checkbox
                      {...field}
                      value={'true'}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Activar agencia</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-grow w-1/3"></div>
        </div>
        <div className="flex flex-col gap-2 ">
          <h2>Agrega plataforma</h2>
          <div className="flex gap-6 mt-2 ">
            <div className="w-1/3">
              <div className="inline-flex items-center">
                <FormField
                  control={form.control}
                  name="showEquativ"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <Checkbox
                          {...field}
                          value="showEquativ"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Equativ</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              {form.watch('showEquativ') && <Equativ control={form.control} />}
            </div>
            <div className="w-1/3">
              <div className="inline-flex items-center">
                <FormField
                  control={form.control}
                  name="showXandr"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <Checkbox
                          {...field}
                          value={'showXandr'}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Xandr</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              {form.watch('showXandr') && <Xandr control={form.control} />}
            </div>
            <div className="w-1/3">
              <div className="inline-flex items-center">
                <FormField
                  control={form.control}
                  name="showEmail"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <Checkbox
                          {...field}
                          value={'showEmail'}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Email</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              {form.watch('showEmail') && <Email control={form.control} />}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button variant={'create'} size={'extraLarge'} type="submit">
            Crear agencia
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
};
