import { ApiError } from '@/lib/apiError';
import type { ApiClientArgs } from '@/types/ApiClientArgs';

export const apiClient = async ({
  url,
  method = 'GET',
  options = {},
  isInternal = false,
  body,
}: ApiClientArgs) => {
  try {
    const baseUrl = isInternal
      ? process.env.NEXT_PUBLIC_BASE_URL
      : process.env.NEXT_PUBLIC_API_ENDPOINT || '';

    if (!isInternal && !baseUrl) {
      throw new Error('Missing NEXT_PUBLIC_BASE_URL for external API call');
    }

    const headers: HeadersInit = {
      ...(options.headers || {}),
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    };

    const res = await fetch(`${baseUrl}${url}`, {
      ...options,
      method,
      headers,
      cache: options.cache ?? 'no-store',
      body: body ? JSON.stringify(body) : undefined,
      ...(isInternal && { credentials: 'include' }),
    });

    let data = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      const message = data?.message || res.statusText || 'Unknown error';
      throw new ApiError(message, res.status, data);
    }

    return data;
  } catch (error: any) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Unexpected error occurred', 500, error);
  }
};

export const http = {
  get: (args: Omit<ApiClientArgs, 'method' | 'body'>) => apiClient({ ...args, method: 'GET' }),

  post: (args: Omit<ApiClientArgs, 'method'>) => apiClient({ ...args, method: 'POST' }),

  put: (args: Omit<ApiClientArgs, 'method'>) => apiClient({ ...args, method: 'PUT' }),

  patch: (args: Omit<ApiClientArgs, 'method'>) => apiClient({ ...args, method: 'PATCH' }),

  delete: (args: Omit<ApiClientArgs, 'method'>) => apiClient({ ...args, method: 'DELETE' }),
};
