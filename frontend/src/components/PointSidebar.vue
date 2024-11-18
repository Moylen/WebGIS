<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ICoordinate, IPoint } from '../interfaces';
import { pointService } from '../services/PointService.ts';
import { processViewDate } from '../utils';

const props = defineProps<{
  isVisible: boolean;
}>();
const emit = defineEmits<{
  (e: 'set-center', coordinate: ICoordinate): ICoordinate;
}>();

// Refs
const points = ref<IPoint[]>([]);
const searchInput = ref<string>('');

// Handlers
const handleInput = async () => {
  points.value = (await pointService.getMany(searchInput.value)).items;
};

onMounted(async () => {
  points.value = (await pointService.getMany()).items;
});
</script>

<template>
  <v-navigation-drawer v-model="props.isVisible" :location="'right'" :width="400">
    <v-list>
      <v-list-item>
        <v-text-field v-model="searchInput" @input="handleInput" label="Поиск" />
      </v-list-item>
      <v-list-item v-for="point in points">
        <v-card
          @click="emit('set-center', point.coordinate)"
          :title="point.title"
          :text="processViewDate(point.createTime)"
          variant="outlined"
        />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
