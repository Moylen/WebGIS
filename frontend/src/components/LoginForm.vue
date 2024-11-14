<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import router from '../router';
import { useAuthStore } from '../store/auth.ts';
import { authService } from '../services/AuthService.ts';

// Store
const authStore = useAuthStore();

// Form
const { handleSubmit, errors } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('Пример: test@mail.ru').required('Поле не должно быть пустым'),
    password: yup.string().required('Поле не должно быть пустым'),
  }),
});

const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');

const onSubmit = handleSubmit(async () => {
  try {
    const token = await authService.login(email.value, password.value);
    authStore.login(token.accessToken);
    await router.push('/');
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <h2 class="text-center mb-4">Авторизация</h2>
    <v-text-field v-model="email" :error-messages="errors.email" label="Эл. почта" />
    <v-text-field v-model="password" :error-messages="errors.password" label="Пароль" type="password" />
    <v-btn type="submit">Войти</v-btn>
  </v-form>
</template>
