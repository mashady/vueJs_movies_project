import { createRouter, createWebHistory } from 'vue-router'
import NowPlaying from '../pages/NowPlaying.vue'
import Upcoming from '../pages/Upcoming.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import TopRated from '../pages/TopRated.vue'
import Trending from '../pages/Trending.vue'
import AllMovies from '../pages/AllMovies.vue'
import AllTV from '../pages/AllTV.vue'
import Calendar from '../pages/Calendar.vue'
import MovieDetails from '../pages/MovieDetails.vue'
const requireAuth = (to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) next();
  else next("/login");
};

const routes = [
  { path: '', name: 'Trending', component: Trending },
  { path: '/calendar', name: 'Home', component: Calendar,beforeEnter: requireAuth },
  { path: '/now-playing', name: 'NowPlaying', component: NowPlaying },
  { path: '/upcoming', name: 'Upcoming', component: Upcoming, beforeEnter: requireAuth },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: '/top-rated', component: TopRated },
  { path: '/trending', component: Trending },
  { path: '/movies', name: 'AllMovies', component: AllMovies },
  { path: '/tv', name: 'AllTV', component: AllTV },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetails
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
