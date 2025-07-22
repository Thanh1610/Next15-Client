import z from 'zod';

export const RegisterSchema = z
  .object({
    name: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword'],
      });
    }
  });

export type RegisterSchemaType = z.TypeOf<typeof RegisterSchema>;
