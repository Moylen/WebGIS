<script setup lang="ts">
import { Map, Layers, Sources, Geometries, Styles } from 'vue3-openlayers';
import { MapBrowserEvent } from 'ol';
import { onMounted, ref } from 'vue';
import { mdiMapMarker, mdiFormatListNumbered } from '@mdi/js';
import PointCreateModalForm from './PointCreateModalForm.vue';
import { ICoordinate, IPoint } from '../interfaces';
import PointModal from './PointModal.vue';
import { getCoordinatesFromFeatures } from '../utils';
import { fromLonLat } from 'ol/proj';
import * as _ from 'lodash-es';
import { pointService } from '../services/PointService.ts';
import PointSidebar from './PointSidebar.vue';

// Constants
const MAP_PROJECTION = 'EPSG:3857';
const MAP_ZOOM = 15;

// Refs
const points = ref<IPoint[]>([]);
const selectedPoint = ref<IPoint>();
const newMarkerCoords = ref<ICoordinate>();
const mapCenter = ref<ICoordinate>(fromLonLat([92.797562, 55.9945039], MAP_PROJECTION));
const isModalFormVisible = ref<boolean>(false);
const isPointModalVisible = ref<boolean>(false);
const isSidebarVisible = ref<boolean>(false);
const view = ref();

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

const handlePointChoose = (coordinate: ICoordinate) => {
  if (!view.value) return;
  view.value.animate({
    center: coordinate,
    duration: 1000,
  });
};

onMounted(async () => {
  points.value = (await pointService.getMany()).items;
});
</script>

<template>
  <v-container fluid class="h-100 px-0 py-0">
    <Map.OlMap class="h-100 position-relative" @click="handleMapClick">
      <v-btn
        class="position-absolute"
        style="z-index: 100; top: 10px; right: 10px"
        @click="isSidebarVisible = !isSidebarVisible"
      >
        <v-icon :size="32" :icon="mdiFormatListNumbered" />
      </v-btn>
      <Map.OlView :ref="(el) => (view = el)" :center="mapCenter" :zoom="MAP_ZOOM" :projection="MAP_PROJECTION" />
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
  <PointSidebar :is-visible="isSidebarVisible" @set-center="(coordinate) => handlePointChoose(coordinate)" />
</template>
