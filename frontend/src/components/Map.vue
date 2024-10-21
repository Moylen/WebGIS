<script setup lang="ts">
import { Map, Layers, Sources, Geometries, Styles } from 'vue3-openlayers';
import { MapBrowserEvent } from 'ol';
import { onMounted, ref } from 'vue';
import { mdiMapMarker } from '@mdi/js';
import PointCreateModalForm from './PointCreateModalForm.vue';
import axios from '../api/axios.ts';
import { Coordinate, Paginate, Point } from '../types';
import PointModal from './PointModal.vue';
import { arraysAreEqual, getCoordinatesFromFeatures } from '../utils';

// Constants
const MAP_CENTER = [92.7975620, 55.9945039];
const MAP_ZOOM = 15;
const MAP_PROJECTION = 'EPSG:4326';

// Api
const getAllPointsCoords = async (): Promise<void> => {
  const response = await axios.get<Paginate<Point>>('/point');
  points.value = response.data.items;
};

// Refs
const points = ref<Point[]>([]);
const selectedPoint = ref<Point | undefined>();
const isModalFormVisible = ref<boolean>(false);
const isPointModalVisible = ref<boolean>(false);
const newMarkerCoords = ref<Coordinate | null>(null);

// Handlers
const handleMapClick = (e: MapBrowserEvent<UIEvent>): void => {
  const features = e.map.getFeaturesAtPixel(e.pixel);

  if (features.length > 0) {
    const coordinates = getCoordinatesFromFeatures(features);

    if (!coordinates) return;

    selectedPoint.value = points.value.find(
      (point: Point) => arraysAreEqual(point.coordinate, coordinates),
    );
    isPointModalVisible.value = !!selectedPoint.value;

    return;
  }

  newMarkerCoords.value = e.coordinate;
  isModalFormVisible.value = true;
};

onMounted(() => {
  getAllPointsCoords();
});
</script>

<template>
  <v-container fluid class="h-100">
    <Map.OlMap class="h-100" @click="handleMapClick">
      <Map.OlView :center="MAP_CENTER" :zoom="MAP_ZOOM" :projection="MAP_PROJECTION" />
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
    :is-visible="isModalFormVisible"
    @close="isModalFormVisible = false"
    @point-add="(point: Point) => points.push(point)"
  />
  <PointModal
    :is-visible="isPointModalVisible"
    :point="selectedPoint"
    @close="isPointModalVisible = false"
  />
</template>