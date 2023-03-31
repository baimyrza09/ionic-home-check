import { SessionProvider } from '@/app/providers/session/SessionProvider';
import { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';

export function applyDeviceIdHeadersFactory(sessionProvider: SessionProvider) {
  return function () {
    return sessionProvider.applyDeviceIdHeaders();
  };
}

export function setUserDeviceIdFactory(sessionProvider: SessionProvider) {
  return function (deviceId: string | null | undefined) {
    return sessionProvider.setUserDeviceId(deviceId);
  };
}

export function setUserSessionExpiresFactory(sessionProvider: SessionProvider) {
  return function (sessionExpires: string | null | undefined) {
    return sessionProvider.setUserSessionExpires(sessionExpires);
  };
}

export function isUserSessionExpiresExpiredFactory(sessionProvider: SessionProvider) {
  return function () {
    return sessionProvider.isUserSessionExpiresExpired();
  };
}

export function setUserHeadersFactory(sessionProvider: SessionProvider) {
  return function (headers: RawAxiosResponseHeaders | AxiosResponseHeaders) {
    return sessionProvider.setUserHeaders(headers);
  };
}

export function getUserSessionExpiresFactory(sessionProvider: SessionProvider) {
  return function () {
    return sessionProvider.getUserSessionExpires();
  };
}

export function startSessionTimerFactory(sessionProvider: SessionProvider) {
  return function (onSessionTimerEnds: TimerHandler) {
    return sessionProvider.startSessionTimer(onSessionTimerEnds);
  };
}

export function clearUserSessionExpiresFactory(sessionProvider: SessionProvider) {
  return function () {
    return sessionProvider.clearUserSessionExpires();
  };
}

export function isUserSessionExpiresExpiringFactory(sessionProvider: SessionProvider) {
  return function () {
    return sessionProvider.isUserSessionExpiresExpiring();
  };
}
