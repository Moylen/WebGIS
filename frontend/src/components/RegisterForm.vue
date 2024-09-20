<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h2 class="text-center mb-4">Регистрация</h2>
    <v-text-field
      v-model="username"
      :rules="usernameRules"
      label="Имя пользователя"
      required
    />
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
    <v-btn :disabled="!valid" @click="register">Зарегистрироваться</v-btn>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from '../api/axios.ts';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const valid = ref(false);
    const username = ref('');
    const email = ref('');
    const password = ref('');

    const router = useRouter();

    const usernameRules = [
      (v: string) => !!v || 'Поле не должно быть пустым',
      (v: string) => (v && v.length >= 3) || 'Поле должно быть не менее 3 символов',
    ];
    const emailRules = [
      (v: string) => !!v || 'Поле не должно быть пустым',
      (v: string) => /.+@.+\..+/.test(v) || 'Почта должна быть валидна',
    ];
    const passwordRules = [
      (v: string) => !!v || 'Поле не должно быть пустым',
    ];

    const register = async () => {
      if (valid.value) {
        try {
          await axios.post('/auth/register', {
            username: username.value,
            email: email.value,
            password: password.value,
          });
          await router.push('/login');
        } catch (error) {
          console.error(error);
        }
      }
    };

    return {
      valid,
      username,
      email,
      password,
      usernameRules,
      emailRules,
      passwordRules,
      register,
    };
  },
});
</script>
