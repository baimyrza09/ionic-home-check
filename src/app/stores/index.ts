import { defineStore } from 'pinia';
import { keepAlive } from '@/shared/services/auth/service';

export const userStore = defineStore('user', {
  state: () => {
    return {
      authorized: false,
    };
  },
  getters: {
    isAuthorized: (state) => state.authorized,
  },

  actions: {
    async checkUser() {
      try {
        await keepAlive();
      } catch (e) {
        console.error('Пользователь не авторизован');
      }
    },
  },
});
