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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { FormDataSchema, formSchema } from '../interfaces/schema-form';
import { getCampaigns } from '@/modules/green-list/campaign/services/campaigns';
import { useQuery } from '@tanstack/react-query';

import { CampaignInterface } from '@/modules/green-list/campaign/interfaces/campaign.interface';
import { useState } from 'react';

export const CreateVideo = () => {
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const form = useForm<FormDataSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      campaignId: '',
      file: undefined,
      adTitle: '',
      description: '',
      duration: '',
      clickThrough: '',
      clientPixel: '',
      verifier: '',
      extra: '',
      startTracking: '',
      firstQuartileTracking: '',
      midpointTracking: '',
      thirdQuartileTracking: '',
      completeTracking: '',
      vendor: '',
      javaScriptResource: '',
    },
  });
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => getCampaigns(),
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    setFileInputKey(Date.now());
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h4 className="mt-9">Datos básicos (requeridos)</h4>
        <div className="w-full flex   mb-4  gap-3 ">
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Nombre del video" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
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
          <div className="w-1/4">
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
                            Selecciona el video
                          </span>
                        )}
                      </label>
                      <Input
                        id="video-upload"
                        type="file"
                        accept="video/*"
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
            <FormField
              control={form.control}
              name="adTitle"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Titulo del creativo" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-full flex  mt-3 mb-4  gap-3 ">
          <div className="w-[calc(50%+12px)] ">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Descripción" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Duración en segundos"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="clickThrough"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Url de destino (clickThrough)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <h4 className="mt-9">Píxeles (opcionales)</h4>
        <div className="w-full flex mb-4  gap-3 ">
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="clientPixel"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Pixel seguimiento de cliente (clientPixel)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="verifier"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Pixel del verificador" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="extra"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Pixel adicional" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4"></div>
        </div>
        <h4 className="mt-9">Tracking (opcionales)</h4>
        <div className="w-full flex mb-4  gap-3 ">
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="startTracking"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Start Tracking" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="firstQuartileTracking"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="First Quartile Tracking" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="midpointTracking"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Midpoint Tracking" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="thirdQuartileTracking"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Third Quartile Tracking" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-full flex mb-4 mt-3 gap-3 ">
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="completeTracking"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Complete Tracking" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="vendor"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Vendor" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/4"></div>
          <div className="w-1/4"></div>
        </div>
        <h4 className="mt-9">Scripts (opcionales)</h4>
        <div className="w-full flex mb-4  gap-3 ">
          <div className="w-full">
            <FormField
              control={form.control}
              name="javaScriptResource"
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
        </div>
        <div className="w-full mt-14 mb-4 flex justify-end">
          <Button variant={'create'} className="w-1/4" type="submit">
            Crear video (VAST)
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
};
