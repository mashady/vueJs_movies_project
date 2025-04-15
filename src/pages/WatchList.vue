<template>
    <div class="container mt-4 watchlist-page">
        <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3">Loading your watchlist...</p>
        </div>

        <div v-else>
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="mb-0">My Watchlist</h2>
                <span class="badge bg-primary rounded-pill">
                    {{ watchlist.length }} {{ watchlist.length === 1 ? 'movie' : 'movies' }}
                </span>
            </div>

            <div v-if="watchlist.length === 0" class="empty-watchlist text-center py-5">
                <i class="bi bi-film display-5 text-muted mb-3"></i>
                <h4 class="text-muted">Your watchlist is empty</h4>
                <p class="text-muted">Start adding movies to see them here</p>
                <router-link to="/movies" class="btn btn-primary mt-3">
                    Browse Movies
                </router-link>
            </div>

            <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                <div v-for="movie in watchlist" :key="movie.id" class="col">
                    <div class="card h-100 shadow-sm">
                        <div class="poster-container">
                            <img :src="getPosterUrl(movie.poster_path)" class="card-img-top" :alt="movie.title"
                                @error="handleImageError" />
                            <button @click="removeFromWatchList(movie.id)" class="btn btn-danger remove-btn">
                                <i class="bi bi-trash"></i> Remove
                            </button>
                        </div>

                        <div class="card-body">
                            <h5 class="card-title">{{ movie.title }}</h5>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="text-muted small">
                                    <i class="bi bi-calendar me-1"></i>
                                    {{ formatDate(movie.release_date) }}
                                </span>
                                <span class="text-muted small">
                                    <i class="bi bi-clock me-1"></i>
                                    {{ formatAddedDate(movie.added_at) }}
                                </span>
                            </div>
                            <p class="card-text small text-muted clamp-text">
                                {{ movie.overview || 'No description available' }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useWatchListStore } from '../stores/watchListStore'

const watchListStore = useWatchListStore()
const toast = useToast()

const loading = computed(() => watchListStore.loading)
const watchlist = computed(() => watchListStore.watchlist)

onMounted(() => {
    watchListStore.fetchWatchList()
})

const removeFromWatchList = async (movieId) => {
    console.log('Trying to remove:', movieId)
    try {
        await watchListStore.removeFromWatchList(movieId)
        toast.success('Removed from watchlist')
    } catch (error) {
        toast.error('Failed to remove')
    }
}

const getPosterUrl = (path) => {
    return path
        ? `https://image.tmdb.org/t/p/w500/${path}`
        : '/placeholder-movie.jpg'
}

const handleImageError = (e) => {
    e.target.src = '/placeholder-movie.jpg'
}

const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short'
    })
}

const formatAddedDate = (dateString) => {
    if (!dateString) return ''
    const now = new Date()
    const addedDate = new Date(dateString)
    const diffDays = Math.floor((now - addedDate) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`

    return formatDate(dateString)
}
</script>

<style scoped>
.watchlist-page {
    min-height: 70vh;
}

.empty-watchlist {
    background-color: #f8f9fa;
    border-radius: 10px;
}

.poster-container {
    position: relative;
    overflow: hidden;
}

.poster-container img {
    transition: transform 0.3s ease;
}

.poster-container:hover img {
    transform: scale(1.05);
}

.remove-btn {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 2;
}

.poster-container:hover .remove-btn {
    opacity: 1;
}

.card {
    border: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.badge {
    font-size: 1rem;
    padding: 0.5em 0.8em;
}
</style>
