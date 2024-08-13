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

export const formSchema = z.object({
  videoName: z.string().min(1, 'El nombre del video es requerido'),
  campaignId: z.string().min(1, 'La campaña es requerida'),
  file: videoRequired(),
  creativeTitle: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  clickThrough: z.string().url('Debe ser una url válida'),

  clientPixel: optionalUrl(),
  verifierPixel: optionalUrl(),
  extraPixel: optionalUrl(),

  startTracking: optionalUrl(),
  firstQuartileTracking: optionalUrl(),
  midpointTracking: optionalUrl(),
  thirdQuartileTracking: optionalUrl(),
  completeTracking: optionalUrl(),

  scriptVerificationName: z.string(),
  scriptVerificationUrl: optionalUrl(),

  additionalScripts: z
    .array(
      z.object({
        text: z.string().min(1, 'El texto es requerido'),
      }),
    )
    .optional(),
});

export type FormDataSchema = z.infer<typeof formSchema>;
