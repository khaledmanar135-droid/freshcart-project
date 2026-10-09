'use server'
import { getMyToken as baseGetMyToken } from "@/features/auth/server/token.actions";

export async function getMyToken() {
  return baseGetMyToken();
}
