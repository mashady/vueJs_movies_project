import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import SearchBar from './components/SearchBar.vue'

import 'bootstrap'
import 'vue-cal/dist/vuecal.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('NavBar', NavBar)
app.component('Footer', Footer)
app.component('SearchBar', SearchBar)

app.use(Toast, {
  position: 'bottom-center',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  toastClassName: 'custom-toast'
})

app.mount('#app')

const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  // Set global user state if needed
}
