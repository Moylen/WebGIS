<script setup lang="ts">
import { Map, Layers, Sources, Geometries, Styles } from 'vue3-openlayers';
import { MapBrowserEvent } from 'ol';
import { onMounted, ref } from 'vue';
import { mdiMapMarker } from '@mdi/js';
import PointCreateModalForm from './PointCreateModalForm.vue';
import api from '../api/api.ts';
import { ICoordinate, IPaginate, IPoint } from '../interfaces';
import PointModal from './PointModal.vue';
import { getCoordinatesFromFeatures } from '../utils';
import { fromLonLat } from 'ol/proj';
import * as _ from 'lodash-es';

// Constants
const MAP_PROJECTION = 'EPSG:3857';
const MAP_CENTER = fromLonLat([92.797562, 55.9945039], MAP_PROJECTION);
const MAP_ZOOM = 15;

// Api
const getAllPointsCoords = async (): Promise<void> => {
  try {
    const response = await api.get<IPaginate<IPoint>>('/point');
    points.value = response.data.items;
  } catch (error) {
    console.error(error);
  }
};

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
    :coordinates="newMarkerCoords"
    :is-visible="isModalFormVisible"
    @close="isModalFormVisible = false"
    @point-add="(point: IPoint) => points.push(point)"
  />
  <PointModal :is-visible="isPointModalVisible" :point="selectedPoint" @close="isPointModalVisible = false" />
</template>
