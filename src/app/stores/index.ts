import { defineStore } from 'pinia';
import { keepAlive } from '@/shared/services/auth/service';

export const userStore = defineStore('user', {
  state: () => {
    return {
      authorized: false,
      claim: null,
    };
  },
  getters: {
    isAuthorized: (state) => state.authorized,
    claimSub: (state) => state.claim,
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
