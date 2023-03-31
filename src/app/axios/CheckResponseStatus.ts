import { AxiosResponse } from 'axios';
import { HttpError } from '@/app/axios/HttpError';
import { convertObjectDates } from '@/shared/lib/date';
import { isObject } from '@/shared/lib/common';

export function AxiosResponseTreatment(response: AxiosResponse) {
  if (response.status === 200) {
    if (Array.isArray(response.data.data)) {
      response.data.data = response.data.data.map((payload: any) => {
        if (isObject(payload)) {
          return convertObjectDates(payload, 'standard');
        }
        return payload;
      });

      return response;
    }

    if (isObject(response.data.data)) {
      response.data.data = convertObjectDates(response.data.data, 'standard');
      return response;
    }

    return response;
  }

  if (response.status === 404) {
    if (Object.prototype.hasOwnProperty.call(response.data, 'data')) {
      return response;
    }

    return Promise.reject(new HttpError(`URL: ${response.config.url} не найден`, response));
  }

  if (response.status === 403) {
    return Promise.reject(new HttpError('Нет доступа', response));
  }

  if (response.status >= 500) {
    const errorTitle = 'Произошла техническая ошибка';
    const errorMessage = response.data.errorMessage ? response.data.errorMessage : '';
    return Promise.reject(new HttpError(`${errorTitle}: ${errorMessage}`, response));
  }

  return Promise.reject(new HttpError(response.data.message, response));
}
