import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

type AnyObject = Record<string, string|boolean|number|null|undefined|object>

export type BaseOkResponse = {
  status: 'Ok';
};
console.log(import.meta.env.NODE_ENV)
const baseUrl =   import.meta.env.VITE_BASE_API_URL_LOCAL || import.meta.env.VITE_BASE_API_URL || '/api/';

const getConfig = (config?: Partial<AxiosRequestConfig>): AxiosRequestConfig => {
  if (typeof window === 'undefined') return {...config}
  const token = localStorage.getItem('token');

  const baseConfigs: AxiosRequestConfig = {
    headers: {},
  };
  if (token) {
    baseConfigs.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return {
    withCredentials: false,
    ...config,
    ...baseConfigs,
  };
};

console.log(`baseUrl -> `, baseUrl)

// Исправленная функция getUrl
const getUrl = (url: string): string => {
  // Если baseUrl относительный путь, просто объединяем
  if (baseUrl.startsWith('/')) {
    return `${baseUrl}${url}`.replace(/\/+/g, '/'); // убираем двойные слеши
  }
  // Если baseUrl абсолютный URL, используем конструктор URL
  return new URL(url, baseUrl).toString();
};

export const Axios = {
  get   : <T = AnyObject>(url: string, config?: Partial<AxiosRequestConfig>) =>
    axios.get<T>(getUrl(url), getConfig(config || {})),
  post  : <T = AnyObject, D = AnyObject>(url: string, data: D, config?: Partial<AxiosRequestConfig>) =>
    axios.post<D, AxiosResponse<T>>(getUrl(url), data, getConfig(config)),
  put   : <T = AnyObject, D = AnyObject>(url: string, data: D, config?: Partial<AxiosRequestConfig>) =>
    axios.put<D, AxiosResponse<T>>(getUrl(url), data, getConfig(config)),
  delete: <T = AnyObject>(url: string, config?: Partial<AxiosRequestConfig>) =>
    axios.delete<T>(getUrl(url), getConfig(config)),
};
