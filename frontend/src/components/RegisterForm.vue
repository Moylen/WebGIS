<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import router from '../router';
import { authService } from '../services/AuthService.ts';

// Form
const { handleSubmit, errors } = useForm({
  validationSchema: yup.object({
    username: yup.string().min(3, 'Поле должно содержать минимум 3 символа').required('Поле не должно быть пустым'),
    email: yup.string().email('Пример: test@mail.ru').required('Поле не должно быть пустым'),
    password: yup.string().required('Поле не должно быть пустым'),
  }),
});

const { value: username } = useField<string>('username');
const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');

const onSubmit = handleSubmit(async () => {
  try {
    await authService.register(username.value, email.value, password.value);
    await router.push('/login');
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <h2 class="text-center mb-4">Регистрация</h2>
    <v-text-field v-model="username" :error-messages="errors.username" label="Имя пользователя" />
    <v-text-field v-model="email" :error-messages="errors.email" label="Эл. почта" />
    <v-text-field v-model="password" :error-messages="errors.password" label="Пароль" type="password" />
    <v-btn type="submit">Зарегистрироваться</v-btn>
  </v-form>
</template>
