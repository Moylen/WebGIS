<script setup lang="ts">
import { Map, Layers, Sources, Geometries, Styles } from 'vue3-openlayers';
import { MapBrowserEvent } from 'ol';
import { onMounted, ref } from 'vue';
import { mdiMapMarker } from '@mdi/js';
import PointCreateModalForm from './PointCreateModalForm.vue';
import axios from '../api/axios.ts';
import { Coordinate, Paginate, Point } from '../types';

// Constants
const MAP_CENTER = [92.7975620, 55.9945039];
const MAP_ZOOM = 15;
const MAP_PROJECTION = 'EPSG:4326';

// Api
const getAllPointsCoords = async (): Promise<void> => {
  const response = await axios.get<Paginate<Point>>('/point');
  points.value = response.data.items;
}

// Refs
const points = ref<Point[]>([]);
const isModalVisible = ref<boolean>(false);
const newMarkerCoords = ref<Coordinate | null>(null);

// Handlers
const handleMapClick = (e: MapBrowserEvent<UIEvent>): void => {
  const features = e.map.getFeaturesAtPixel(e.pixel);

  if (features.length > 0) {
    // TODO: Добавить сайд-меню для информации
  } else {
    newMarkerCoords.value = e.coordinate;
    isModalVisible.value = true;
  }
};

onMounted(() => {
  getAllPointsCoords();
})
</script>

<template>
  <v-container fluid class="h-100">
    <Map.OlMap class="h-100" @click="handleMapClick">
      <Map.OlView :center="MAP_CENTER" :zoom="MAP_ZOOM" :projection="MAP_PROJECTION" /> />
      <Layers.OlTileLayer>
        <Sources.OlSourceOsm />
      </Layers.OlTileLayer>

      <Layers.OlVectorLayer>
        <Sources.OlSourceVector>

          <Map.OlFeature v-for="point in points">
            <Geometries.OlGeomPoint :coordinates="point.coordinate" />
            <Styles.OlStyle>

              <Styles.OlStyleIcon>
                <v-icon :size="32" :color="'#c0392b'" :icon="mdiMapMarker" />
              </Styles.OlStyleIcon>

            </Styles.OlStyle>
          </Map.OlFeature>
        </Sources.OlSourceVector>
      </Layers.OlVectorLayer>

    </Map.OlMap>
  </v-container>
  <PointCreateModalForm
    :coords="newMarkerCoords"
    :is-visible="isModalVisible"
    @close="isModalVisible = false"
    @point-add="(point: Point) => points.push(point)"
  />
</template>