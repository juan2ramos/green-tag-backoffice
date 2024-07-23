import { z } from 'zod';

const optionalUrl = () =>
  z.union([
    z.string().url('Debe ser una URL válida').optional(),
    z.literal(''),
  ]);
const videoRequired = () =>
  z
    .instanceof(File, { message: 'El video es requerido' })
    .refine((file) => file.type.startsWith('video/'), {
      message: 'El archivo debe ser un video',
    });
const numberPositive = () =>
  z
    .string()
    .min(1, 'La cantidad debe ser mayor a 0')
    .default('')
    .refine((val) => !isNaN(Number(val)), { message: 'debe ser número' })
    .refine((val) => Number(val) > 0, {
      message: 'Debe ser un número positivo',
    });

export const formSchema = z.object({
  name: z.string().min(1, 'El nombre del video es requerido'),
  campaignId: z.string().min(1, 'La campaña es requerida'),
  file: videoRequired(),
  adTitle: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  duration: numberPositive(),
  clickThrough: z.string().url('Debe ser una url válida'),
  clientPixel: optionalUrl(),
  verifier: optionalUrl(),
  extra: optionalUrl(),
  startTracking: optionalUrl(),
  firstQuartileTracking: optionalUrl(),
  midpointTracking: optionalUrl(),
  thirdQuartileTracking: optionalUrl(),
  completeTracking: optionalUrl(),
  vendor: z.string(),
  javaScriptResource: z.union([z.string().optional(), z.literal('')]),
});

export type FormDataSchema = z.infer<typeof formSchema>;
