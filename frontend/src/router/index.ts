import HomePage from "../pages/HomePage.vue";
import RegisterPage from '../pages/RegisterPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;