import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

import 'bootstrap'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('NavBar', NavBar)
app.component('Footer', Footer)

app.mount('#app')
