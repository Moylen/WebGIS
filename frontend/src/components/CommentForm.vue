<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { IComment } from '../interfaces';
import * as yup from 'yup';
import api from '../api/api.ts';
import { commentService } from '../services/CommentService.ts';

const props = defineProps<{
  pointId?: number;
}>();
const emit = defineEmits<{
  (e: 'comment-add', comment: IComment): IComment;
}>();

// Form
const { handleSubmit, errors, resetField } = useForm({
  validationSchema: yup.object({
    text: yup.string().required('Поле не должно быть пустым'),
    score: yup.number().required('Поле не должно быть пустым').min(1).max(5),
  }),
});

const { value: text } = useField<string>('text');
const { value: score } = useField<number>('score', undefined, {
  initialValue: 1,
});

const onSubmit = handleSubmit(async () => {
  try {
    if (!props.pointId) return;
    const comment = await commentService.save(props.pointId, text.value, score.value);

    emit('comment-add', comment);
    resetField('text');
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <v-textarea label="Ваш комментарий" rows="4" v-model="text" :error-messages="errors.text" outlined required />
    <div class="d-flex align-start justify-space-between">
      <v-rating v-model="score" :length="5" :size="32" active-color="primary" hover />
      <v-btn type="submit" color="primary">Отправить</v-btn>
    </div>
  </v-form>
</template>
