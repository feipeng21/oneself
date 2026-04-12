import { createApp } from 'vue';
import App from './App.vue';
import '../lib/lizi/style.css';
import './styles/grid.css';
import './styles/base.css';
import './styles/sections.css';
import './modules/legacy-config.js';
import './modules/widgets/polarchart.js';
import './modules/widgets/typewriter.js';
import './modules/widgets/clock.js';
import '../lib/lizi/particless.min.js';

createApp(App).mount('#app');
