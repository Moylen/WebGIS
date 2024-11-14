import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken'),
    isAuthenticated: !!localStorage.getItem('accessToken'),
  }),
  actions: {
    login(accessToken: string): void {
      localStorage.setItem('accessToken', accessToken);
      this.accessToken = accessToken;
      this.isAuthenticated = !!this.accessToken;
    },
    logout(): void {
      localStorage.removeItem('accessToken');
      this.accessToken = '';
      this.isAuthenticated = !!this.accessToken;
    },
  },
});
