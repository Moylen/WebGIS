<script setup lang="ts">
import { Point } from '../types';

const props = defineProps<{
  point: Point | undefined,
  isVisible: boolean,
}>();
const emit = defineEmits<{
  (e: 'close'): void,
}>();

const closeModal = (): void => {
  emit('close');
}
</script>

<template>
  <v-dialog v-model="props.isVisible" @click:outside="closeModal" max-width="600">
    <v-card>
      <v-card-title>
        <span class="headline">Информация о точке {{ props.point?.title }}</span>
      </v-card-title>
      <v-card-text>
        <p>Координаты:</p>
        <p>{{ props.point?.coordinate }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="closeModal">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>