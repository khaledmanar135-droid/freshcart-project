import { authOption } from '@/features/auth/server/auth.options';
import NextAuth from 'next-auth';

const handler = NextAuth(authOption)

export {handler as GET , handler as POST}