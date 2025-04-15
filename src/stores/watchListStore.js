import { defineStore } from 'pinia'
import axios from 'axios'

const LOCAL_API = 'http://localhost:3000'

export const useWatchListStore = defineStore('watchlist', {
    state: () => ({
        watchlist: [],
        loading: false,
        error: null
    }),
    actions: {
        async fetchWatchList() {
            this.loading = true
            try {
                const response = await axios.get(`${LOCAL_API}/watchlist`)
                this.watchlist = response.data
            } catch (err) {
                this.error = err
            } finally {
                this.loading = false
            }
        },

        async removeFromWatchList(movieId) {
            console.log('Deleting from JSON Server:', movieId)
            try {
                await axios.delete(`${LOCAL_API}/watchlist/${movieId}`)
                this.watchlist = this.watchlist.filter(movie => movie.id !== movieId)
            } catch (error) {
                throw error
            }
        },

        async addToWatchList(movie) {
            try {
                const response = await axios.post(`${LOCAL_API}/watchlist`, {
                    id: movie.id,
                    ...movie,
                    added_at: new Date().toISOString()
                })
                this.watchlist.push(response.data)
            } catch (error) {
                throw error
            }
        }

    },
    getters: {
        isInWatchList: (state) => (movieId) => {
            return state.watchlist.some(movie => movie.id === movieId)
        }
    }
})