import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { FormDataSchema, formSchema } from '../interfaces/schema-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getProjects } from '../../projects/services/project';
import { useQuery } from '@tanstack/react-query';

import { useCreateBonusMutation } from '../hooks/useBonus';
import { ProjectInterface } from '../../projects/interfaces/project';
const CreateProject = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });
  const mutation = useCreateBonusMutation();
  const form = useForm<FormDataSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      urlBlockchain: '',
      co2Total: '',
      projectId: '',
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    mutation.mutate({ ...data, co2Total: Number(data.co2Total) });
  }
  return (
    <>
      <section className="wrapper">
        <div className=" w-full">
          <h2 className="pb-2">Crear un bono</h2>
          <hr />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex gap-5 mt-9 mb-4 "
            >
              <div className="w-1/5">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Link del bono padre" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/5">
                <FormField
                  control={form.control}
                  name="urlBlockchain"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Link del blockchain bono padre"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/5">
                <FormField
                  control={form.control}
                  name="co2Total"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Cantidad de CO2 Inicial"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/5">
                <FormField
                  control={form.control}
                  name="projectId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[220px] bg-[white]">
                            <SelectValue placeholder="Seleccione un proyecto" />
                          </SelectTrigger>
                          <SelectContent>
                            {projects?.map((project: ProjectInterface) => (
                              <SelectItem
                                key={project.id}
                                value={project.id as string}
                              >
                                {project.name}
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
              <div className="w-1/5">
                <Button
                  disabled={mutation.isPending}
                  variant={'create'}
                  size={'extraLarge'}
                  type="submit"
                >
                  Crear bono
                  <ArrowRightIcon className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
};

export default CreateProject;
