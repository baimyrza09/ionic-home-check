import axios, { AxiosResponse } from 'axios';
import { AxiosResponseTreatment } from '@/app/axios/CheckResponseStatus';

export function http(baseUrl: string) {
  const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    validateStatus: () => true,
  });

  instance.interceptors.response.use(
    (response: AxiosResponse) => AxiosResponseTreatment(response),
    (error) => Promise.reject(new Error(`Произошла техническая ошибка ${error}`))
  );

  instance.interceptors.request.use((value) => {
    return value;
  });

  return instance;
}

export function authServiceApi() {
  return http(`${process.env.VUE_APP_API_URL}/api/v1/`);
}

export function deliveryServiceApi() {
  return http(`${process.env.VUE_APP_API_URL}/delivery-service/api/`);
}
