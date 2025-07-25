export interface ApiResponse<T = any> {
  status: 'SUCCESS' | 'ERR';
  message: string;
  data?: T;
}
