<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h2 class="text-center mb-4">Авторизация</h2>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Эл. почта"
      required
    />
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Пароль"
      type="password"
      required
    />
    <v-btn :disabled="!valid" @click="login">Войти</v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from '../api/axios.ts';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const valid = ref(false);
    const email = ref('');
    const password = ref('');

    const router = useRouter();

    const emailRules = [
      (v: string) => !!v || 'Поле не должно быть пустым',
      (v: string) => /.+@.+\..+/.test(v) || 'Почта должна быть валидна',
    ];
    const passwordRules = [
      (v: string) => !!v || 'Поле не должно быть пустым',
    ];

    const login = async () => {
      if (valid.value) {
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
      }
    };

    return {
      valid,
      email,
      password,
      emailRules,
      passwordRules,
      login,
    };
  },
});
</script>
