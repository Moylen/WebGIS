<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import axios from '../api/axios.ts';
import { Coordinate, Point } from '../types';

const props = defineProps<{
  isVisible: boolean,
  coords: Coordinate | null,
}>();
const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'point-add', point: Point): void,
}>();

// Form
const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: yup.object({
    title: yup.string()
      .required('Поле не может быть пустым'),
    file: yup.mixed(),
  }),
});

const { value: title } = useField<string>('title');
const { value: file }= useField<File | null>('file');

const onSubmit = handleSubmit(async () => {
  try {
    const pointResponse = await axios.post<Point>('/point', {
      title: title.value,
      coordinate: props.coords,
    });

    if (file.value) {
      const formData = new FormData();
      formData.append('file', file.value);
      await axios.post<File>(
        `/point/${pointResponse.data.id}/photo`, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      )
    }

    emit('point-add', pointResponse.data)
    closeModal();
  } catch (error) {
    console.error(error);
  }
});

// Modal
const closeModal = () => {
  resetForm();
  emit('close');
};
</script>

<template>
  <v-dialog
    v-model="props.isVisible"
    @click:outside="closeModal"
    @submit.prevent="onSubmit"
    max-width="500px">

    <v-form @submit.prevent="onSubmit">
      <v-card title="Добавить точку">

        <v-card-text>
          <v-text-field
            v-model="title"
            :error-messages="errors.title"
            label="Название"
          />
          <v-file-input
            v-model="file"
            :error-messages="errors.file"
            label="Фотография"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" type="submit">Сохранить</v-btn>
          <v-btn @click="closeModal">Закрыть</v-btn>
        </v-card-actions>

      </v-card>
    </v-form>

  </v-dialog>
</template>