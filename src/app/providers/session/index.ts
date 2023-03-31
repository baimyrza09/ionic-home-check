import { SessionProvider } from './SessionProvider';
import {
  applyDeviceIdHeadersFactory,
  clearUserSessionExpiresFactory,
  getUserSessionExpiresFactory,
  isUserSessionExpiresExpiredFactory,
  isUserSessionExpiresExpiringFactory,
  setUserDeviceIdFactory,
  setUserHeadersFactory,
  setUserSessionExpiresFactory,
  startSessionTimerFactory,
} from './SessionService';

const authProvider = new SessionProvider();

const applyDeviceIdHeaders = applyDeviceIdHeadersFactory(authProvider);
const setUserDeviceId = setUserDeviceIdFactory(authProvider);
const setUserSessionExpires = setUserSessionExpiresFactory(authProvider);
const isUserSessionExpiresExpired = isUserSessionExpiresExpiredFactory(authProvider);
const setUserHeaders = setUserHeadersFactory(authProvider);
const getUserSessionExpires = getUserSessionExpiresFactory(authProvider);
const startSessionTimer = startSessionTimerFactory(authProvider);
const clearUserSessionExpires = clearUserSessionExpiresFactory(authProvider);
const isUserSessionExpiresExpiring = isUserSessionExpiresExpiringFactory(authProvider);
export default {
  applyDeviceIdHeaders,
  setUserDeviceId,
  setUserSessionExpires,
  setUserHeaders,
  isUserSessionExpiresExpired,
  getUserSessionExpires,
  startSessionTimer,
  clearUserSessionExpires,
  isUserSessionExpiresExpiring,
};
