import * as zod from 'zod';

export const LoginSchema=zod.object({
  email:zod.email('invalid email formate'),
  password:zod.string().regex(/^.{3,}$/,'enter avalid password'),
})
