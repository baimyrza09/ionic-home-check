import session from '@/app/providers/session';
import { userStore } from '@/app/stores';
import { getPinCode } from '@/shared/lib/auth';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export default async function auth({ next }) {
  const store = userStore();

  if (!store.isAuthorized) {
    await store.checkUser();
  }

  const pinCode = await getPinCode();
  if ((pinCode && !store.isAuthorized) || session.isUserSessionExpiresExpired()) {
    return next({
      path: '/pinCode',
    });
  }

  if (!store.isAuthorized || session.isUserSessionExpiresExpired()) {
    return next({
      path: '/auth',
    });
  }

  return next();
}
