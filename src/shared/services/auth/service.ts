import { authServiceApi } from '@/app/axios';
import session from '@/app/providers/session';
import { userStore } from '@/app/stores';
export async function login(username: string, password: string) {
  const deviceIdHeaders = session.applyDeviceIdHeaders();

  const response = await authServiceApi().get('login', {
    headers: { ...deviceIdHeaders, username, password },
  });

  if (response.status) {
    session.setUserHeaders(response.headers);
  }

  return response;
}

export async function keepAlive() {
  const store = userStore();
  const response = await authServiceApi().get('keep-alive');
  if (response.status) {
    session.setUserHeaders(response.headers);
    store.$patch({ authorized: true });
  }

  return response;
}

export async function logout() {
  const store = userStore();
  store.$patch({ authorized: false });
  return authServiceApi().get('logout');
}
