import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import { CONFIG } from '../constants';

export const abortController = new AbortController();

const http = axios.create({
  baseURL: CONFIG.API_SERVER,
  signal: abortController.signal,
});

export const setAccessToken = (token?: string) => {
  if (token) {
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common.Authorization;
  }
};

http.interceptors.response.use(
  (res) => res.data,
  (err: AxiosError) => {
    // if (err.response?.status === 401) {
    //   window.location.href = '/login';
    // }
    throw err?.response?.data || err;
  },
);

export class HttpService {
  static get(url: string, queries: any = {}, config?: AxiosRequestConfig) {
    return HttpService.request('GET', url, { params: queries, ...config });
  }

  static post(url: string, data: any = {}, config?: AxiosRequestConfig) {
    return HttpService.request('POST', url, { data, ...config });
  }

  static put(url: string, data: any = {}, config?: AxiosRequestConfig) {
    return HttpService.request('PUT', url, { data, ...config });
  }

  static patch(url: string, data: any = {}, config?: AxiosRequestConfig) {
    return HttpService.request('PATCH', url, { data, ...config });
  }

  static delete(url: string, data: any = {}, config?: AxiosRequestConfig) {
    return HttpService.request('DELETE', url, { data, ...config });
  }

  static request(
    method: Method,
    url: string,
    data?: AxiosRequestConfig,
  ): Promise<any> {
    return http.request({
      method,
      url,
      ...data,
    });
  }
}
