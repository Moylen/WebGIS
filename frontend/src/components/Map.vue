<script setup lang="ts">
import { Map, Layers, Sources, Geometries, Styles } from 'vue3-openlayers';
import { MapBrowserEvent } from 'ol';
import { onMounted, ref } from 'vue';
import { mdiMapMarker } from '@mdi/js';
import PointCreateModalForm from './PointCreateModalForm.vue';
import { ICoordinate, IPoint } from '../interfaces';
import PointModal from './PointModal.vue';
import { getCoordinatesFromFeatures } from '../utils';
import { fromLonLat } from 'ol/proj';
import * as _ from 'lodash-es';
import { pointService } from '../services/PointService.ts';

// Constants
const MAP_PROJECTION = 'EPSG:3857';
const MAP_CENTER = fromLonLat([92.797562, 55.9945039], MAP_PROJECTION);
const MAP_ZOOM = 15;

// Refs
const points = ref<IPoint[]>([]);
const selectedPoint = ref<IPoint>();
const isModalFormVisible = ref<boolean>(false);
const isPointModalVisible = ref<boolean>(false);
const newMarkerCoords = ref<ICoordinate>();

// Handlers
const handleMapClick = (e: MapBrowserEvent<UIEvent>): void => {
  const features = e.map.getFeaturesAtPixel(e.pixel);

  if (features.length > 0) {
    const coordinates = getCoordinatesFromFeatures(features);

    if (!coordinates) return;

    selectedPoint.value = points.value.find((point: IPoint) => _.isEqual(point.coordinate, coordinates));
    isPointModalVisible.value = !!selectedPoint.value;

    return;
  }

  newMarkerCoords.value = e.coordinate;
  isModalFormVisible.value = true;
};

onMounted(async () => {
  points.value = (await pointService.getMany()).items;
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
          <Map.OlFeature v-for="point in points" :key="point.id">
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
    :coordinate="newMarkerCoords"
    :is-visible="isModalFormVisible"
    @close="isModalFormVisible = false"
    @point-add="(point: IPoint) => points.push(point)"
  />
  <PointModal :is-visible="isPointModalVisible" :point="selectedPoint" @close="isPointModalVisible = false" />
</template>
