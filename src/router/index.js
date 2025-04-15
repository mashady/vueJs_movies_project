import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import NowPlaying from '../pages/NowPlaying.vue'
import Upcoming from '../pages/Upcoming.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'

const requireAuth = (to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) next();
  else next("/login");
};




const routes = [
  { path: '/', name: 'Home', component: Home ,beforeEnter: requireAuth},
  { path: '/now-playing', name: 'NowPlaying', component: NowPlaying ,beforeEnter: requireAuth},
  { path: '/upcoming', name: 'Upcoming', component: Upcoming ,beforeEnter: requireAuth},
  {path: "/login",name: "Login",component: Login},
  {path: "/register",name : "Register",component: Register}
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
