import * as zod from 'zod';

export const CashSchema=zod.object({
   city:zod.string().nonempty('City is Required'),
   phone:zod.string().nonempty('Phone is Required'),
   details:zod.string().nonempty('Details is Required'),
   postalCode:zod.string().nonempty('postalCode is Required'),
})
