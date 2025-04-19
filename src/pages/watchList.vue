<template>
    <div class="container mt-4 watchlist-page ">
        <div v-if="loading" class="text-center py-5">
            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3 text-white">Loading your watchlist...</p>
        </div>

        <div v-else>
            <div class="d-flex flex-column align-items-center mb-5">
                <h2 class="text-center text-white mb-3 watchlist-title">My Watchlist</h2>
                <span class="badge rounded-pill px-3 py-2">
                    {{ watchlist.length }} {{ watchlist.length === 1 ? 'movie' : 'movies' }}
                </span>
            </div>

            <div v-if="watchlist.length === 0" class="empty-watchlist bg-dark text-center py-5">
                <i class="bi bi-film display-5 mb-3"></i>
                <h4 class="mb-3">Your watchlist is empty</h4>
                <p class="mb-4">Start adding movies to see them here</p>
                <router-link :to="{ name: 'AllMovies' }" class="btn btn-lg px-4 browse-btn">
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
    padding-top: 2rem;
}

.empty-watchlist {
    border-radius: 12px;
    padding: 3rem 2rem;
    min-width: 600px;
    margin: 0 auto;
    color: #787676;
}

.watchlist-title {
    font-size: 2.2rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    position: relative;
    padding-bottom: 10px;
}

.browse-btn {
    background-image: linear-gradient(to right, #913af5, #e934a2);
    border: none;
    color: white;
    font-weight: 500;
    transition: all 0.3s ease;
}

.browse-btn:hover {
    background-image: linear-gradient(to right, #a24cf7, #f03db0);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(145, 58, 245, 0.4);
    color: white;
}

.badge {
    background-image: linear-gradient(to right, #913af5, #e934a2);
    color: white;
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 0.5px;
}

.spinner-border {
    background-image: linear-gradient(to right, #913af5, #e934a2);
    background-color: transparent;
    border: none;
}

@media (max-width: 768px) {
    .watchlist-title {
        font-size: 1.8rem;
    }

    .empty-watchlist {
        padding: 2rem 1rem;
        min-width: auto;
        width: 100%;
    }
}
</style>