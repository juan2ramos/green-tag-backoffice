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
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@radix-ui/react-icons';

import { useState } from 'react';

/* import { useParams } from 'react-router-dom'; */

import { FormDataSchema, formSchema } from '../interfaces/schema-form';

export const UpdateVideo = () => {
  const [fileInputKey] = useState(Date.now());
  const [videoPreview] = useState<string | null>(null);

  const form = useForm<FormDataSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoName: '',
      campaignId: '',
      file: undefined,
      creativeTitle: '',
      description: '',
      clickThrough: '',
      clientPixel: '',
      verifierPixel: '',
      extraPixel: '',
      startTracking: '',
      firstQuartileTracking: '',
      midpointTracking: '',
      thirdQuartileTracking: '',
      completeTracking: '',
      scriptVerificationName: '',
      scriptVerificationUrl: '',
      additionalScripts: [],
    },
  });
  /* 
  const { fields, append, remove } = useFieldArray({
    name: `additionalScripts`,
    control: form.control,
  }); */

  const handleVideoUpload = () => {
    /*     const file = e.target.files?.[0] || null; */
    /* form.setValue('file', file);
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    } */
  };

  /*  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const updatedVideoData = {
      ...data,
      id: videoId,
      additionalScripts: data.additionalScripts?.map((script) => script.text),
    };

    updateMutation.mutate(updatedVideoData);
  };
 */
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h4 className="mt-9">Datos básicos(requeridos)</h4>
        <div className="w-full flex mb-4  gap-3 ">
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="videoName"
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
                      /* disabled={isLoadingVideo} */
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger className=" bg-[white]">
                        <SelectValue placeholder="Seleccione una campaña " />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Renderiza las opciones de campaña */}
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
                        className="text-center w-full border block text-[12px] py-2 cursor-pointer border-dashed rounded-sm overflow-hidden text-ellipsis whitespace-nowrap px-2"
                      >
                        {field.value ? (
                          <span className="text-gray-700">
                            {field.value.name}
                          </span>
                        ) : (
                          <span className=" text-[#C5C5C5]">
                            Selecciona un nuevo video
                          </span>
                        )}
                      </label>
                      <Input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                        key={fileInputKey}
                      />
                      {videoPreview && (
                        <video
                          className="mt-2"
                          controls
                          src={videoPreview}
                          style={{ maxHeight: '200px', maxWidth: '100%' }}
                        />
                      )}
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
              name="creativeTitle"
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

        <div className="w-full mt-14 mb-4 flex justify-end">
          <Button
            /* variant={'created'} */
            className="w-1/4"
            type="submit"
            /*    disabled={updateMutation.isLoading} */
          >
            {/*  {updateMutation.isLoading ? 'Actualizando...' : 'Actualizar video'} */}
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
};
