import { cookies } from 'next/headers';

// Lưu ý: chỉ gọi được trong môi trường server-side
export const getAuthCookie = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  return token || null;
};
