import { z } from 'zod';

const zipRequired = () =>
  z
    .instanceof(File, { message: 'El archivo es requerido' })
    .refine((file) => file.type === 'application/zip', {
      message: 'El archivo debe ser un ZIP',
    });

export const formSchema = z.object({
  richMediaName: z.string().min(1, 'El nombre del video es requerido'),
  campaignId: z.string().min(1, 'La campaña es requerida'),
  file: zipRequired(),
  additionalScripts: z
    .array(
      z.object({
        text: z.string().min(1, 'El texto es requerido'),
      }),
    )
    .optional(),
});

export type FormDataSchema = z.infer<typeof formSchema>;
