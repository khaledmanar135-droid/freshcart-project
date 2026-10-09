import * as zod from 'zod';

export const registerSchema=zod.object({
  name:zod.string().nonempty('Name is Required').min(3,'at min 2 characters..').max(15,'at most 15 charcters...'),
  email:zod.email('invalid email formate'),
  password:zod.string().regex(/^.{3,}$/,'enter avalid password'),
  rePassword:zod.string().nonempty('confirm password is Required'),
  phone:zod.string().regex(/^01[0125][0-9]{8}$/,'must be egyptian number')
}).refine(
  (obj)=>{
    return obj.password == obj.rePassword
  },{
    error:"password and repassword must be matched",
    path:["rePassword"]
  }
)
