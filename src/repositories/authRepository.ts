import { http } from '@/lib/apiClient';
import { ApiResponse } from '@/types/api';
import { LoginSchemaType, RegisterSchemaType } from '@/validations/auth.schema';

export const loginApi = async (body: LoginSchemaType): Promise<ApiResponse> => {
  return await http.post({
    url: 'user/login',
    body,
  });
};

export const registerApi = async (body: RegisterSchemaType): Promise<ApiResponse> => {
  return await http.post({
    url: 'user/register',
    body,
  });
};

export const setAuthCookieApi = async (token: string): Promise<any> => {
  return await http.post({
    url: '/api/auth/login',
    body: { token },
    isInternal: true,
  });
};

export const logoutApi = async () => {
  return await http.post({
    url: '/api/auth/logout',
    isInternal: true,
  });
};
