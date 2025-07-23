import { z } from 'zod';

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: 'Name must be at least 2 characters long' })
      .max(256, { message: 'Name must be at most 256 characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z
      .string({})
      .trim()
      .min(10, { message: 'Phone number must be exactly 10 digits' })
      .max(10, { message: 'Phone number must be exactly 10 digits' })
      .regex(/^0\d{9}$/, {
        message: 'Phone number must start with 0',
      }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(100, { message: 'Password must be at most 100 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm password must be at least 6 characters' })
      .max(100, { message: 'Confirm password must be at most 100 characters' }),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export type RegisterSchemaType = z.TypeOf<typeof RegisterSchema>;

export const LoginSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(100, { message: 'Password must be at most 100 characters' }),
  })
  .strict();

export type LoginSchemaType = z.TypeOf<typeof LoginSchema>;
