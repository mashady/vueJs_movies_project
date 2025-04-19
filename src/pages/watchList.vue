<template>
    <div class="container mt-4 watchlist-page">
        <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3 text-white">Loading your watchlist...</p>
        </div>

        <div v-else>
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="mb-0 text-white">My Watchlist</h2>
                <span class="badge bg-primary rounded-pill">
                    {{ watchlist.length }} {{ watchlist.length === 1 ? 'movie' : 'movies' }}
                </span>
            </div>

            <div v-if="watchlist.length === 0" class="empty-watchlist text-center py-5">
                <i class="bi bi-film display-5 text-light mb-3"></i>
                <h4 class="text-light">Your watchlist is empty</h4>
                <p class="text-light">Start adding movies to see them here</p>
                <router-link :to="{ name: 'AllMovies' }" class="btn btn-primary mt-3">
                    Browse Movies
                </router-link>
            </div>

            <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                <MovieCard v-for="movie in watchlist" :key="movie.id" :movie="movie" :show-remove-button="true"
                    :on-remove="removeFromWatchList" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, watch, onActivated } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useWatchListStore } from '../stores/watchListStore'
import MovieCard from '../components/MovieCard.vue'
import { computed } from 'vue';

const toast = useToast()
const route = useRoute()
const watchlistStore = useWatchListStore()

const loading = computed(() => watchlistStore.loading)
const watchlist = computed(() => watchlistStore.watchlist)

const fetchWatchList = () => {
    watchlistStore.fetchWatchList()
}

onMounted(() => {
    fetchWatchList()
})

onActivated(() => {
    fetchWatchList()
})

watch(() => route.fullPath, () => {
    fetchWatchList()
})

const removeFromWatchList = async (movie) => {
    console.log(movie)
    console.log("remooooooooooooooved")
    console.log(movie.id)
    try {
        const success = await watchlistStore.removeFromWatchList(movie.id)
        await watchlistStore.fetchWatchList()
        if (success) {
            toast.success('Removed from watchlist')
        }
    } catch (error) {
        toast.error('Failed to remove')
    }
}
</script>

<style scoped>
.watchlist-page {
    min-height: 70vh;
}

.empty-watchlist {
    border-radius: 10px;
    padding: 2rem;
}

.badge {
    font-size: 1rem;
    padding: 0.5em 0.8em;
}
</style>
