import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/app/router'
import { createPinia } from 'pinia'
import axios from 'axios'

const app = createApp(App)
const pinia = createPinia()

axios.defaults.baseURL = 'http://localhost:3000/';

app.use(router)
app.use(pinia)

app.mount('#app')
