import axiosInstance from '@/lib/axios';
import { ApiResponse } from '@/types/api';
import { LoginSchemaType, RegisterSchemaType } from '@/validations/auth.schema';

export const registerApi = async (data: RegisterSchemaType): Promise<ApiResponse> => {
  const URL_API = `user/register`;
  return await axiosInstance.post(URL_API, data);
};

export const loginApi = async (data: LoginSchemaType): Promise<ApiResponse> => {
  const URL_API = `user/login`;
  return await axiosInstance.post(URL_API, data);
};
