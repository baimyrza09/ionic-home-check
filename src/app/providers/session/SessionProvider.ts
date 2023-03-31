import dayjs from 'dayjs';
import { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';

export enum HEADERS {
  DEVICE_ID = 'x-device-id',
  SESSION_EXPIRES_AT = 'session-expires-at',
}
interface Provider {
  applyDeviceIdHeaders(): { [p: string]: string | null };
  setUserDeviceId(deviceId: string): void;
  setUserSessionExpires(sessionExpires: string): void;
  clearUserSessionExpires(): void;
  isUserSessionExpiresExpiring(): void;
  getUserSessionExpires(): string | null | undefined;
  startSessionTimer(onSessionTimerEnds: TimerHandler): void;
}

export class SessionProvider implements Provider {
  private DEVICE_ID: string | null = null;
  private sessionTimerId?: number;
  private DEVICE_ID_KEY = HEADERS.DEVICE_ID;
  private userDeviceId?: string | null;
  private userSessionExpires?: string | null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  get deviceId() {
    if (!this.DEVICE_ID) {
      this.deviceId = localStorage.getItem(this.DEVICE_ID_KEY);
    }
    return this.DEVICE_ID;
  }

  set deviceId(deviceId: string | null) {
    if (deviceId) {
      this.DEVICE_ID = deviceId;
      localStorage.setItem(this.DEVICE_ID_KEY, this.DEVICE_ID);
    }
  }

  get getCookie() {
    const cookies = document.cookie.split(';');
    const sessionExpires = cookies.find((cookies) => cookies.trim().startsWith('SessionExpires='));
    return sessionExpires ? sessionExpires.split('=')[1] : '';
  }

  get sessionExpires() {
    return this.userSessionExpires;
  }

  getSessionTime(timeSessionExpires: string) {
    const time = dayjs(timeSessionExpires);
    const minute = 1000 * 60;
    const expiresIn = time.diff(dayjs());
    return expiresIn - minute;
  }

  setUserDeviceId(deviceId: string | null | undefined) {
    if (!deviceId) return;
    this.userDeviceId = deviceId;
    localStorage.setItem(this.DEVICE_ID_KEY, this.userDeviceId);
  }

  applyDeviceIdHeaders() {
    return { [HEADERS.DEVICE_ID]: this.deviceId };
  }

  getUserSessionExpires() {
    return this.sessionExpires;
  }

  setUserSessionExpires(time: string | null | undefined) {
    if (!time) return;
    const expires = new Date(time);
    document.cookie = `SessionExpires=${time}; expires=${expires}; path=/`;
    this.userSessionExpires = this.getCookie;
  }

  clearUserSessionExpires() {
    document.cookie = `SessionExpires=${this.getCookie}; expires=${new Date(1970)}; path=/`;
  }

  isUserSessionExpiresExpired() {
    const date = this.getUserSessionExpires();
    if (!date) return true;
    return dayjs().isAfter(dayjs(date));
  }

  isUserSessionExpiresExpiring() {
    const timeSessionExpires = this.getCookie;
    if (!timeSessionExpires) return true;
    const minute = 1000 * 60;
    const timeout = this.getSessionTime(timeSessionExpires);
    return timeout <= minute;
  }

  setUserHeaders(headers: RawAxiosResponseHeaders | AxiosResponseHeaders) {
    this.setUserDeviceId(headers[HEADERS.DEVICE_ID]);
    this.setUserSessionExpires(headers[HEADERS.SESSION_EXPIRES_AT]);
  }

  startSessionTimer(onSessionTimerEnds: TimerHandler) {
    const timeSessionExpires = this.getUserSessionExpires();
    if (!timeSessionExpires) return;

    const timeout = this.getSessionTime(timeSessionExpires);
    this.sessionTimerId = window.setTimeout(onSessionTimerEnds, timeout);
  }
}
