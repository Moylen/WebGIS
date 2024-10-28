import HomePage from '../pages/HomePage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import { useAuthStore } from '../store/auth.ts';

const routes = [
  {
    path: '/',
    component: HomePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/register',
    component: RegisterPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router;