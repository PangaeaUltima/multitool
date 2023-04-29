/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import axios from 'axios'
import '@/assets/scss/main.scss'
import api from '@/plugins/api'
// Composables
import { createApp } from 'vue'


// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app.config.globalProperties.$axios = axios
app.use(api, { axios })

app.mount('#app')
