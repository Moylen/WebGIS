<script setup lang="ts">
import router from '../router';
import { useAuthStore } from '../store/auth.ts';

// Store
const authStore = useAuthStore();

// Routes
const goToHome = () => router.push('/');
const goToRegister = () => router.push('/register');
const goToLogin = () => router.push('/login');

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <v-app-bar app>
    <v-toolbar-title>WebGIS</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="authStore.isAuthenticated" @click="goToHome">Главная</v-btn>
    <v-btn v-if="!authStore.isAuthenticated" @click="goToRegister">Регистрация</v-btn>
    <v-btn v-if="!authStore.isAuthenticated" @click="goToLogin">Авторизация</v-btn>
    <v-btn v-if="authStore.isAuthenticated" @click="logout">Выйти</v-btn>
  </v-app-bar>
</template>

<style scoped></style>
