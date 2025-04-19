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
import watchList from '../pages/watchList.vue'
import MovieDetails from '../pages/MovieDetails.vue'

const requireAuth = (to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) next();
  else next("/login");
};

const routes = [
  {
    path: '',
    name: 'Trending',
    component: Trending,
    meta: {
      title: 'Trending - Flox'
    }
  },
  {
    path: '/watch-list',
    name: 'watchList',
    component: watchList,
    beforeEnter: requireAuth,
    meta: {
      title: 'Watchlist - Flox',
      hideSearch: true
    }
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar,
    beforeEnter: requireAuth,
    meta: {
      title: 'Calendar - Flox',
      hideSearch: true
    }
  },
  {
    path: '/now-playing',
    name: 'NowPlaying',
    component: NowPlaying,
    meta: {
      title: 'Now Playing - Flox'
    }
  },
  {
    path: '/upcoming',
    name: 'Upcoming',
    component: Upcoming,
    meta: {
      title: 'Upcoming - Flox'
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: 'Login - Flox'
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: 'Register - Flox',
      hideSearch: true
    }
  },
  {
    path: '/top-rated',
    name: 'TopRated',
    component: TopRated,
    meta: {
      title: 'Top Rated Movies - Flox'
    }
  },
  {
    path: '/movies',
    name: 'AllMovies',
    component: AllMovies,
    meta: {
      title: 'Movies - Flox'
    }
  },
  {
    path: '/tv',
    name: 'AllTV',
    component: AllTV,
    meta: {
      title: 'TV - Flox'
    }
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetails,
    meta: {
      title: 'Movie Details - Flox'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Movies & TV Shows - Flox';
  next();
});

export default router;