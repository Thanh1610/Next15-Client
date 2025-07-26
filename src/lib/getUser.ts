import { cookies } from 'next/headers';

export const getUser = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) return null;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, {
      method: 'GET',
      headers: {
        Cookie: `access_token=${token}`,
      },
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Unknown error');
    }

    return data.user;
  } catch (error: any) {
    console.error('getUser error:', error.message || error);
    return null;
  }
};
