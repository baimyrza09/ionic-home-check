import session from '@/app/providers/session';
import { userStore } from '@/app/stores';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export default async function pinCode({ next }) {
  const store = userStore();
  if (store.isAuthorized && !session.isUserSessionExpiresExpired() && store.isAuthorizedPin) {
    return next({
      path: '/',
    });
  }

  return next();
}
