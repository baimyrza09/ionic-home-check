import session from '@/app/providers/session';
import { userStore } from '@/app/stores';
import { getPinCode } from '@/shared/lib/auth';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export default async function guest({ next }) {
  const store = userStore();
  const pinCode = await getPinCode();
  if (!pinCode && store.isAuthorized && !session.isUserSessionExpiresExpired()) {
    return next({
      path: '/',
    });
  }

  if (store.isAuthorized && !session.isUserSessionExpiresExpired()) {
    return next({
      path: '/pinCode',
    });
  }

  return next();
}
