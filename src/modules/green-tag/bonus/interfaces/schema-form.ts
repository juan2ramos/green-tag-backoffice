import { z } from 'zod';
export const formSchema = z.object({
  url: z.string().url('Url no válida'),
  urlBlockchain: z.string().url('Url no válida'),
  co2Total: z
    .string()
    .min(1, 'La cantidad debe ser mayor a 0')
    .default('')
    .refine((val) => !isNaN(Number(val)), { message: 'debe ser número' })
    .refine((val) => Number(val) > 0, {
      message: 'Debe ser un número positivo',
    }),

  projectId: z.string().min(1, 'El proyecto es requerido'),
});

export type FormDataSchema = z.infer<typeof formSchema>;
