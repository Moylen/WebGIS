<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToHome = () => router.push('/');
const goToRegister = () => router.push('/register');
const goToLogin = () => router.push('/login')
</script>

<template>
  <v-app-bar app>
    <v-toolbar-title>WebGIS</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click='goToHome'>Главная</v-btn>
    <v-btn @click='goToRegister'>Регистрация</v-btn>
    <v-btn @click='goToLogin'>Авторизация</v-btn>
  </v-app-bar>
</template>

<style scoped>

</style>