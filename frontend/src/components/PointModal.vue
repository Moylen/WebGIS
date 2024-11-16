<script setup lang="ts">
import type { IComment, IPoint } from '../interfaces';
import CommentForm from './CommentForm.vue';
import { ref, watch } from 'vue';
import Comment from './Comment.vue';
import config from '../config';
import { commentService } from '../services/CommentService.ts';

const props = defineProps<{
  isVisible: boolean;
  point?: IPoint;
}>();
const emit = defineEmits<{
  (e: 'close'): void;
}>();

const comments = ref<IComment[]>([]);

const closeModal = (): void => {
  emit('close');
};

watch(
  () => props.isVisible,
  async (val) => {
    if (!val) return;
    if (!props.point?.id) return;

    comments.value = (await commentService.getMany(props.point.id)).items;
  },
);
</script>

<template>
  <v-dialog v-model="props.isVisible" @click:outside="closeModal" max-width="800">
    <v-card>
      <v-card-title class="headline"> Информация о точке {{ props.point?.title || '' }} </v-card-title>
      <v-card-item>
        <v-img v-if="point?.photo?.filePath" :src="config.baseURL + point.photo.filePath" />
      </v-card-item>
      <v-card-item>
        <h5 class="text-h5 pb-2">Комментарии</h5>
        <CommentForm @comment-add="(comment: IComment) => comments.unshift(comment)" :point-id="point?.id" />
      </v-card-item>
      <v-card-item>
        <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
      </v-card-item>
    </v-card>
  </v-dialog>
</template>
