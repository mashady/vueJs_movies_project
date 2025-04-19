<template>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex" @click="goToDetails" style="cursor: pointer">
    <div class="card movie-card text-light border-0 shadow w-100">
      <div class="poster-wrapper position-relative">
        <img 
          :src="getPosterImage(movie.poster_path)" 
          class="card-img-top movie-img" 
          :alt="movie.title || movie.name"
          @error="handleImageError"
        />

        <div v-if="showRemoveButton" class="remove-btn text-white">
          <button @click.stop="handleRemove"
            class="btn text-white btn-sm d-flex align-items-center gap-2">
            <i class="bi bi-trash text-white"></i>
            Remove
          </button>
        </div>
      </div>

      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ movie.title || movie.name }}</h5>
        <p class="card-text small">
          {{ movie.overview?.slice(0, 100) }}...
        </p>
        <div class="mt-auto">
          <p class="card-text mb-1">
            <small>
              Rating:
              <span v-html="renderStars(movie.vote_average)"></span>
            </small>
          </p>
          <p class="card-text" v-if="movie.release_date">
            <small>Year: {{ new Date(movie.release_date).getFullYear() }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  },
  addToWatchList: {
    type: Function,
    default: null
  },
  isInWatchList: {
    type: Function,
    default: null
  },
  showRemoveButton: {
    type: Boolean,
    default: false
  },
  onRemove: {
    type: Function,
    default: null
  }
})

const router = useRouter()

const getPosterImage = (posterPath) => {
  return posterPath 
    ? `https://image.tmdb.org/t/p/w500/${posterPath}`
    : '/default-movie.jpg'; 
}

const handleImageError = (event) => {
  event.target.src = '/default-movie.jpg';
  event.target.classList.add('default-poster');
}

const renderStars = (rating) => {
  const stars = Math.round(rating / 2)
  return '★'.repeat(stars) + '☆'.repeat(5 - stars)
}

const goToDetails = () => {
  const mediaType = props.movie.media_type || (props.movie.name ? 'tv' : 'movie');
  router.push(`/${mediaType}/${props.movie.id}`);
}

const handleRemove = () => {
  if (props.onRemove) {
    props.onRemove(props.movie)
  }
}
</script>

<style scoped>
.movie-card {
  background-color: #343a40;
  height: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  border-radius: 0.5rem;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
}

.movie-img {
  height: 350px;
  object-fit: cover;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  background-color: #2c3e50;
}

.movie-img.default-poster {
  object-fit: contain;
  padding: 2rem;
  background-color: #343a40;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.remove-btn {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%) scale(0.95);
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 2;
  background-image: linear-gradient(to right, #913af5, #e934a2);
  color: white !important;
  }

.poster-wrapper:hover .remove-btn {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}
.movie-img {
  height: 350px;
  width: 100%;
  object-fit: cover;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  background-color: #2c3e50;
}

.movie-img.default-poster {
  object-fit: cover; 
  padding: 0;        
  background-color: #2c3e50; 
}

</style>