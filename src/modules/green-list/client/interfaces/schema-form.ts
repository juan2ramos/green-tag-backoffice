import { z } from 'zod';
export const formSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
});

export type FormDataSchema = z.infer<typeof formSchema>;
