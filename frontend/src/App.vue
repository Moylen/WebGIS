<script setup lang="ts">

import Navbar from './components/Navbar.vue';
</script>

<template>
  <v-app>
    <Navbar/>

    <v-main>
      <router-view/>
    </v-main>

    <v-footer app></v-footer>
  </v-app>
</template>

<style scoped>

</style>
