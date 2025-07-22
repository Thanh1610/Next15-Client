import axiosInstance from './axios';

const fetcher = async (url: string) => {
  return await axiosInstance.get(url).then(res => res);
};
export default fetcher;
