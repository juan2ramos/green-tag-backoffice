import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useForm, useFieldArray } from 'react-hook-form';
import { CampaignInterface } from '@/modules/green-list/campaign/interfaces/campaign.interface';
import { useQuery } from '@tanstack/react-query';
import { getCampaigns } from '@/modules/green-list/campaign/services/campaigns';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@radix-ui/react-icons';

export const CreateBrandLift = () => {
  const form = useForm({
    defaultValues: {
      question: '',
      questionPixel: '',
      answers: [{ text: '', pixel: '' }], // Inicializa con una respuesta
    },
  });

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => getCampaigns(),
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'answers', // El nombre del campo de respuestas en el formulario
  });

  const templates = [
    {
      id: 1,
      name: 'Plantilla Si / No',
    },
    {
      id: 2,
      name: 'Plantilla múltiple',
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))}>
        <h4 className="mt-9">Datos básicos</h4>
        <div className="w-full flex mb-2 gap-3">
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Nombre del Brand Lift " />
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
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger className="bg-[white]">
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
              name="templateId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger className="bg-[white]">
                        <SelectValue placeholder="Seleccione una plantilla " />
                      </SelectTrigger>
                      <SelectContent>
                        {templates?.map((template) => (
                          <SelectItem
                            key={template.id}
                            value={template.id?.toString() || ''}
                          >
                            {template.name}
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
        </div>

        <h4 className="mt-7">Pregunta</h4>
        <div className="w-full flex mb-4 gap-3">
          <div className="w-full flex mb-2 gap-3">
            <div className="w-1/3">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Título de la pregunta " />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/3">
              <FormField
                control={form.control}
                name="questionPixel"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="URL del píxel " />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <h4 className="mt-7">Respuestas</h4>

        {fields.map((field, index) => (
          <div className="w-full flex mb-4 gap-3">
            <div className="w-full flex mb-2 gap-3" key={field.id}>
              <div className="w-1/3">
                <FormField
                  control={form.control}
                  name={`answers.${index}.text`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Texto de la respuesta "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/3">
                <FormField
                  control={form.control}
                  name={`answers.${index}.pixel`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="URL del píxel de respuesta "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="w-1/6">
          <Button
            variant={'secondary'}
            className="w-full"
            type="button"
            onClick={() => append({ text: '', pixel: '' })}
          >
            Agregar respuesta
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className=" w-full flex justify-end">
          <Button variant={'create'} className="w-1/4" type="submit">
            Crear Brand Lift
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
};
