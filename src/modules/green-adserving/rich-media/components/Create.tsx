import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, TrashIcon } from '@radix-ui/react-icons';
import { FormDataSchema, formSchema } from '../interfaces/schema-form';
import { getCampaigns } from '@/modules/green-list/campaign/services/campaigns';
import { useQuery } from '@tanstack/react-query';

import { CampaignInterface } from '@/modules/green-list/campaign/interfaces/campaign.interface';
import { useState } from 'react';
import { useCreateRichMediaMutation } from '../hooks/useCreateReachMedia';

export const CreateRichMedia = () => {
  const { mutation, isLoading: isLoadingCreateVideo } =
    useCreateRichMediaMutation();
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const form = useForm<FormDataSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      richMediaName: '',
      campaignId: '',
      file: undefined,
      additionalScripts: [],
    },
  });
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => getCampaigns(),
  });
  const { fields, append, remove } = useFieldArray({
    name: `additionalScripts`,
    control: form.control,
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    const richMediaData = {
      ...data,
      additionalScripts: data.additionalScripts?.map((script) => script.text),
    };

    mutation.mutate(richMediaData, {
      onSuccess: () => {
        form.reset();
        setFileInputKey(Date.now());
      },
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full flex  mt-9  gap-3 ">
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="richMediaName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Nombre del rich media" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="campaignId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger className=" bg-[white]">
                        <SelectValue placeholder="Seleccione una campaña " />
                      </SelectTrigger>
                      <SelectContent>
                        {campaigns?.map((campaign: CampaignInterface) => (
                          <SelectItem
                            key={campaign.id}
                            value={campaign.id?.toString() || ''}
                          >
                            {campaign.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <label
                        htmlFor="video-upload"
                        className="text-center w-full border block  text-[12px] py-2 cursor-pointer border-dashed rounded-sm"
                      >
                        {field.value ? (
                          <span className="text-gray-700">
                            {field.value.name}
                          </span>
                        ) : (
                          <span className=" text-[#C5C5C5]">
                            Selecciona el archivo .zip
                          </span>
                        )}
                      </label>
                      <Input
                        id="video-upload"
                        type="file"
                        accept=".zip,application/zip"
                        onChange={(e) =>
                          field.onChange(e.target.files?.[0] || null)
                        }
                        className="hidden"
                        placeholder="Archivo .zip"
                        key={fileInputKey}
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <h4 className="mt-9">Script adicionales (opcionales)</h4>
        {fields.map((field, index) => (
          <div className="w-full flex mb-4  gap-3 " key={field.id}>
            <div className="w-full">
              <FormField
                control={form.control}
                name={`additionalScripts.${index}.text`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="JS del script enviado por el cliente"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              variant={'outline'}
              type="button"
              onClick={() => remove(index)}
            >
              <TrashIcon className="w-4 h-4  text-[red]" />
            </Button>
          </div>
        ))}

        <div className="w-full flex justify-end">
          <Button
            variant={'outline'}
            type="button"
            onClick={() => append({ text: '' })}
          >
            <span>Agregar script</span>
          </Button>
        </div>
        <div className="w-full flex justify-end mt-14 mb-4 ">
          <Button
            variant={'create'}
            className="w-1/4"
            type="submit"
            disabled={isLoadingCreateVideo}
          >
            Crear rich media
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
};
