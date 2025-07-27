import { http } from '@/lib/apiClient';

export const fetchUserFromApi = async (token: string) => {
  return await http.get({
    url: '/api/profile',
    options: {
      headers: {
        Cookie: `access_token=${token}`,
      },
      cache: 'no-store',
    },
    isInternal: true,
  });
};
