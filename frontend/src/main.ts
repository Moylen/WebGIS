import { createApp } from 'vue';

// Components
import App from './App.vue';

// Pinia
import { createPinia } from 'pinia';

const pinia = createPinia();

// OpenLayers
import {
  Map,
  Layers,
  Sources,
  Geometries,
  Styles,
  Interactions,
  type Vue3OpenlayersGlobalOptions,
} from 'vue3-openlayers';

const options: Vue3OpenlayersGlobalOptions = {
  debug: Boolean(Number(import.meta.env.VITE_DEBUG)),
};

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import router from './router';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
});

createApp(App)
  .use(pinia)
  .use(vuetify)
  .use(router)
  .use(Map, options)
  .use(Layers)
  .use(Sources)
  .use(Geometries)
  .use(Styles)
  .use(Interactions)
  .mount('#app');
