<script setup lang="ts">
import { ref, onMounted } from 'vue';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import { OSM } from 'ol/source';

const mapElement = ref<HTMLElement | null>(null);

onMounted(() => {
    if (!mapElement.value) return;

    new Map({
      target: mapElement.value,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([92.7975620, 55.9945039]),
        zoom: 15,
      }),
    });
  },
);
</script>

<template>
  <v-container fluid>
    <div ref="mapElement" class="map" />
  </v-container>
</template>

<style scoped>
.map {
  width: 100%;
  height: 500px;
}
</style>