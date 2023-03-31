import session from '@/app/providers/session';
import { userStore } from '@/app/stores';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export default async function guest({ next }) {
  const store = userStore();
  if (store.isAuthorized && !session.isUserSessionExpiresExpired()) {
    return next({
      path: '/',
    });
  }

  return next();
}
