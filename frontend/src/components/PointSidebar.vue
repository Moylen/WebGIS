<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IAutocomplete, ICoordinate, IPoint } from '../interfaces';
import { pointService } from '../services/PointService.ts';
import { processViewDate } from '../utils';
import { debounce as _debounce } from 'lodash-es';

const props = defineProps<{
  isVisible: boolean;
}>();
const emit = defineEmits<{
  (e: 'set-center', coordinate: ICoordinate): ICoordinate;
}>();

// Refs
const points = ref<IPoint[]>([]);
const autocomplete = ref<IAutocomplete[]>([]);
const searchInput = ref<string>('');

// Handlers
const onInputChange = _debounce(async (value: string) => {
  points.value = (await pointService.getMany(value)).items;
  autocomplete.value = await pointService.getAutocomplete(value);
}, 250);

onMounted(async () => {
  points.value = (await pointService.getMany()).items;
});
</script>

<template>
  <v-navigation-drawer v-model="props.isVisible" :location="'right'" :width="400">
    <v-list>
      <v-list-item>
        <v-combobox
          label="Поиск"
          v-model="searchInput"
          @update:model-value="onInputChange"
          :items="autocomplete.map((item) => item.title)"
          clearable
        />
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
