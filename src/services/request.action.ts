'use server'
import { request as baseRequest } from '@/lib/request.action';

export async function request(path:string, options:RequestInit = {}) {
  return baseRequest(path, options);
}
