import { z } from 'zod';
const additionalDataEquativSchema = z.object({
  username: z.string().min(1, 'El nombre de usuario es requerido'),
  password: z.string().min(4, 'La contraseña es requerida'),
  clientId: z.string().min(1, 'El ID del cliente es requerido'),
  clientSecret: z.string().min(1, 'El secreto del cliente es requerido'),
});

const additionalDataXandrSchema = z.object({
  username: z.string().min(1, 'El nombre de usuario es requerido'),
  password: z.string().min(4, 'La contraseña es requerida'),
});

const additionalDataEmail = z.object({
  email: z.string().email('Correo electrónico no válido'),
});

const conditionalEquativSchema = z
  .object({
    name: z.string().optional(),
    additionalData: additionalDataEquativSchema,
  })
  .optional();

const conditionalXandrSchema = z
  .object({
    name: z.string().optional(),
    additionalData: additionalDataXandrSchema,
  })
  .optional();

const conditionalEmailSchema = z
  .object({
    name: z.string().optional(),
    additionalData: additionalDataEmail,
  })
  .optional();

export const formSchema = z
  .object({
    name: z.string().min(3, { message: 'Mínimo 3 caracteres' }),
    compensationStrategies: z
      .object({
        Equativ: conditionalEquativSchema,
        Xandr: conditionalXandrSchema,
        Email: conditionalEmailSchema,
      })
      .optional(),
    active: z.boolean().default(true).optional(),
    showEquativ: z.boolean().optional(),
    showXandr: z.boolean().optional(),
    showEmail: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.showEquativ) {
        return !!data.compensationStrategies?.Equativ?.additionalData;
      }
      return true;
    },
    {
      message: 'Datos adicionales de Equativ son requeridos',
      path: ['compensationStrategies', 'Equativ'],
    },
  )
  .refine(
    (data) => {
      if (data.showXandr) {
        return !!data.compensationStrategies?.Xandr?.additionalData;
      }
      return true;
    },
    {
      message: 'Datos adicionales de Xandr son requeridos',
      path: ['compensationStrategies', 'Xandr'],
    },
  )
  .refine(
    (data) => {
      if (data.showEmail) {
        return !!data.compensationStrategies?.Email?.additionalData;
      }
      return true;
    },
    {
      message: 'Datos adicionales de Email son requeridos',
      path: ['compensationStrategies', 'Email'],
    },
  );

export type FormDataSchema = z.infer<typeof formSchema>;
