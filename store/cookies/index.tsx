"use cookies";

import { cookies } from "next/headers";
export async function create(key: string, value: string) {
  const setCookies = cookies().set(key, value);
  return setCookies;
}

export async function read(key: string) {
  const getCookies = cookies().get(key)?.value;
  return getCookies;
}

export async function destroy(key: string) {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export const roleToken = async () => {
  const getRoleToken = await read('__ROLE__')
  return getRoleToken
}