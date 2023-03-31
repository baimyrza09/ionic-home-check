import { AxiosResponse } from 'axios';
export class HttpError extends Error {
  response: AxiosResponse;

  constructor(message: string, response: AxiosResponse) {
    super(message);
    this.message = message;
    this.response = response;
  }
}
