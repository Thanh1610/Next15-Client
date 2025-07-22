import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  withCredentials: true,
});

//Interceptor này sẽ chạy trước mỗi request được gửi đi.
axiosInstance.interceptors.request.use(
  function (config) {
    // Thực hiện trước khi gửi request
    // Nếu có token tự động gán vào api

    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Trả về lỗi
    return Promise.reject(error);
  }
);

//Interceptor này sẽ chạy sau khi có phản hồi từ server
axiosInstance.interceptors.response.use(
  function (response) {
    return response?.data ?? response;
  },
  function (error) {
    if (error?.response?.data) return error?.response?.data;
    return Promise.reject(error);
  }
);

export default axiosInstance;
