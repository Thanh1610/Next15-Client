export type ApiClientArgs = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  options?: {
    headers?: HeadersInit;
    cache?: RequestCache;
    credentials?: RequestCredentials;
    mode?: RequestMode;
    signal?: AbortSignal;
    next?: NextFetchRequestConfig;
  };
  isInternal?: boolean;
  body?: any;
};
