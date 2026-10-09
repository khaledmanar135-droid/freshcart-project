import * as zod from 'zod';

export const LoginSchema = zod.object({
  email: zod.string().email('invalid email format'),
  password: zod.string().regex(/^.{3,}$/, 'enter a valid password'),
});