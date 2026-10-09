import * as zod from 'zod';

export const CheckOutSchema=zod.object({
   city:zod.string().nonempty('City is Required'),
   phone:zod.string().nonempty('Phone is Required'),
   details:zod.string().nonempty('Details is Required'),
})
