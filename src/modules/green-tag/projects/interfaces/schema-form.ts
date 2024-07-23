import { z } from 'zod';
export const formSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  url: z
    .string({
      message: 'Url no válida',
    })
    .url('Url no válida'),
  logo: z
    .instanceof(File, { message: 'El logo es requerido' })
    .refine((file) => file.type.startsWith('image/'), {
      message: 'El logo debe ser una imagen',
    }),
});

export type FormDataSchema = z.infer<typeof formSchema>;
