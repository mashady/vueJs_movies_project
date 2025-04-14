import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import NowPlaying from '../pages/NowPlaying.vue'
import Upcoming from '../pages/Upcoming.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/now-playing', name: 'NowPlaying', component: NowPlaying },
  { path: '/upcoming', name: 'Upcoming', component: Upcoming },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
