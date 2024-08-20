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
import {
  ArrowRightIcon,
  DownloadIcon,
  UploadIcon,
} from '@radix-ui/react-icons';
import { FormDataSchema, formSchema } from '../interfaces/schema-form';
import { useQuery } from '@tanstack/react-query';
import { getClients } from '../../client/services/clients';
import { ClientInterface } from '../../client/interfaces/client.interface';
import { CampaignInterface } from '../interfaces/campaign.interface';
import { useState } from 'react';
import { Planning } from './Planning';
import { Reporting } from './Reporting';
interface UpdateCampaignProps {
  campaign: CampaignInterface;
}
export const UpdateCampaign = ({ campaign }: UpdateCampaignProps) => {
  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: () => getClients(),
  });
  const form = useForm<FormDataSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: campaign.name,
      clientId: campaign.client.id?.toString() ?? '',
    },
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenReporting, setDialogOpenReporting] = useState(false);
  const handleCancel = () => {
    setDialogOpen(false);
  };
  const handleCancelReporting = () => {
    setDialogOpenReporting(false);
  };

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }
  return (
    <>
      <Planning
        dialogOpen={dialogOpen}
        handleCancel={handleCancel}
        campaignId={campaign.id ?? 0}
      />
      <Reporting
        dialogOpen={dialogOpenReporting}
        handleCancel={handleCancelReporting}
        campaignId={campaign.id ?? 0}
      />
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
                    <Input {...field} placeholder="Nombre de la campaña" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="clientId"
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
                        <SelectValue placeholder="Seleccione un cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients?.map((client: ClientInterface) => (
                          <SelectItem
                            key={client.id}
                            value={client.id?.toString() ?? ''}
                          >
                            {client.name}
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
            <Button variant={'create'} size={'extraLarge'} type="submit">
              Actualizar campaña
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Form>
      <div className="flex gap-3 pt-3">
        <div className="w-full">
          <Button
            variant={'create'}
            className="w-full bg-[#FFFFF3] text-[#B6B6B6] border border-[#DFE5EB] border-dashed text-[12px]"
            disabled={
              !!(campaign.campaignUrls.length > 0 || campaign.efficiencyReport)
            }
            onClick={() => setDialogOpen(true)}
          >
            <UploadIcon className="w-4 h-4 mr-2" />
            {campaign.campaignUrls.length > 0 || campaign.efficiencyReport
              ? 'Los sitios han sido cargados'
              : 'Cargar sitios (Planning)'}
          </Button>
          <div className="mt-2 flex items-center">
            <a
              href="https://ads.green-tag.io/examples/planning.csv"
              target="_blank"
              className=" text-greenTTY-dark"
            >
              Descarga la plantilla de planning
            </a>
            <DownloadIcon className="ml-1" />
          </div>
        </div>
        <div className="w-full">
          <Button
            variant={'create'}
            className="w-full bg-[#F9FCFF] text-[#B6B6B6] border border-[#DFE5EB] border-dashed text-[12px]"
            onClick={() => setDialogOpenReporting(true)}
          >
            <UploadIcon className="w-4 h-4 mr-2" />
            {campaign.efficiencyReport
              ? 'El reporte ha sido generado'
              : 'Cargar sitios (Reporting)'}
          </Button>
          <div className="mt-2 flex items-center">
            <a
              href="https://ads.green-tag.io/examples/reporting.csv"
              target="_blank"
              className=" text-greenTTY-dark"
            >
              Descarga la plantilla de reporting
            </a>
            <DownloadIcon className="ml-1" />
          </div>
        </div>
      </div>
    </>
  );
};
