import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormDataSchema, formSchema } from '../interfaces/schema-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { z } from 'zod';
import { useCreateProjectMutation } from '../hooks/useProject';
import { useState } from 'react';

export const CreateProject = () => {
  const mutation = useCreateProjectMutation();
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const form = useForm<FormDataSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      url: '',
      logo: undefined,
    },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        setFileInputKey(Date.now());
      },
    });
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-auto gap-5 mt-9 mb-4 "
        >
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Nombre del Proyecto" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Link del Proyecto" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <label
                        htmlFor="logo-upload"
                        className="text-center w-full border block text-gray-700 text-[12px] py-[6px] cursor-pointer"
                      >
                        {field.value
                          ? field.value.name
                          : 'Selecciona el logo del proyecto'}
                      </label>
                      <Input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          field.onChange(e.target.files?.[0] || null)
                        }
                        className="hidden"
                        placeholder="Logo del Proyecto"
                        key={fileInputKey}
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
            <Button variant={'create'} size={'extraLarge'} type="submit">
              Crear Proyecto
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
