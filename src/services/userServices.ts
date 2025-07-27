import { fetchUserFromApi } from '@/repositories/userRepository';

export const getUser = async (token: string) => {
  try {
    if (!token) return null;

    const data = await fetchUserFromApi(token);
    return data.user;
  } catch (error: any) {
    console.error('getUser error:', error.message || error);
    return null;
  }
};
