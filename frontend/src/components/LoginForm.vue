<template>
  <v-form @submit.prevent="onSubmit">
    <h2 class="text-center mb-4">Авторизация</h2>
    <v-text-field
      v-model="email"
      :error-messages="errors.email"
      label="Эл. почта"
    />
    <v-text-field
      v-model="password"
      :error-messages="errors.password"
      label="Пароль"
      type="password"
    />
    <v-btn type="submit">Войти</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import axios from '../api/axios.ts';
import { useRouter } from 'vue-router';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

const router = useRouter();

const { handleSubmit, errors } = useForm({
  validationSchema: yup.object({
    email: yup.string()
      .email('Пример: test@mail.ru')
      .required('Поле не должно быть пустым'),
    password: yup.string()
      .required('Поле не должно быть пустым'),
  }),
});

const { value: email } = useField('email');
const { value: password } = useField('password');

const onSubmit = handleSubmit(async () => {
  try {
    const response = await axios.post('/auth/login', {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem('accessToken', response.data.accessToken);
    await router.push('/login');
  } catch (error) {
    console.error(error);
  }
});
</script>
