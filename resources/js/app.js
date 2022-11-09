import './bootstrap';

import { createApp } from 'vue';
// for ui
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import app from './Page/app.vue'

const vm = createApp(app);
vm.use(BootstrapVue3);
vm.mount('#app');
