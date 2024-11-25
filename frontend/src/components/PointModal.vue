<script setup lang="ts">
import type { IComment, IPoint } from '../interfaces';
import CommentForm from './CommentForm.vue';
import { onMounted, ref } from 'vue';
import Comment from './Comment.vue';
import config from '../config';
import { commentService } from '../services/CommentService.ts';
import { useRouter } from 'vue-router';
import { pointService } from '../services/PointService.ts';

const props = defineProps<{
  pointId: number;
}>();

const router = useRouter();
const comments = ref<IComment[]>([]);
const point = ref<IPoint>();
const isLoading = ref<boolean>(true);

const closeModal = (): void => {
  router.push({ name: 'Home' });
};

onMounted(async () => {
  point.value = await pointService.getOne(props.pointId);
  comments.value = (await commentService.getMany(props.pointId)).items;

  isLoading.value = false;
});
</script>

<template>
  <v-dialog :model-value="true" @click:outside="closeModal" max-width="800">
    <v-card v-if='!isLoading'>
      <v-card-title class="headline"> Информация о точке {{ point?.title || '' }}</v-card-title>
      <v-card-item>
        <v-img v-if="point?.photo?.filePath" :src="config.baseURL + point.photo.filePath" />
      </v-card-item>
      <v-card-item>
        <h5 class="text-h5 pb-2">Комментарии</h5>
        <CommentForm @comment-add="(comment: IComment) => comments.unshift(comment)" :point-id="point?.id" />
      </v-card-item>
      <v-card-item>
        <Comment v-if='!isLoading' v-for="comment in comments" :key="comment.id" :comment="comment" />
      </v-card-item>
    </v-card>
    <v-card v-else class='justify-center align-center' height='100vh'>
      <v-progress-circular indeterminate />
    </v-card>
  </v-dialog>
</template>
