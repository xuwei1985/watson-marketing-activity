import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/assets/js/axios'

const app = createApp(App)
app.use(store).use(router).mount('#app')
app.config.globalProperties.$http = axios
