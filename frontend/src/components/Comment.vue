<script setup lang="ts">
import type { IComment } from '../interfaces';
import { processViewDate } from '../utils';

const props = defineProps<{
  comment: IComment;
}>();
</script>

<template>
  <v-card class="my-2" :variant="'outlined'">
    <v-card-item>
      <v-card-subtitle>
        <div class="d-flex justify-space-between">
          <span>@{{ props.comment.creator.username }}</span>
          <v-rating readonly :length="5" :size="24" :model-value="props.comment.score" active-color="primary" />
        </div>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      {{ props.comment.text }}
    </v-card-text>

    <v-card-text class="pt-0 text-end text-caption">
        Добавлен: {{ processViewDate(props.comment.createTime) }}
    </v-card-text>
  </v-card>
</template>
