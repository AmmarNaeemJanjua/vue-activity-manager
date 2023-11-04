/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Importing axios.js
import '@/services/axios'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
