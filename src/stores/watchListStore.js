import { defineStore } from 'pinia'
import axios from 'axios'

const LOCAL_API = 'http://localhost:3000'

export const useWatchListStore = defineStore('watchlist', {
    state: () => ({
        watchlist: [],
        loading: false,
        error: null,
        getCurrentUserId: () => JSON.parse(localStorage.getItem('user'))?.id || null
    }),

    actions: {
        async fetchWatchList() {
            this.loading = true
            const userId = this.getCurrentUserId()
            try {
                const response = await axios.get(`${LOCAL_API}/watchlist?userId=${userId}`)
                this.watchlist = response.data
            } catch (err) {
                this.error = err
                console.error('Fetch failed:', err)
            } finally {
                this.loading = false
            }
        },

        async addToWatchList(movie) {
            const userId = this.getCurrentUserId()
            try {
                const existing = await axios.get(`${LOCAL_API}/watchlist?id=${movie.id}&userId=${userId}`)
                if (existing.data.length > 0) return

                const response = await axios.post(`${LOCAL_API}/watchlist`, {
                    ...movie,
                    userId: userId,
                    added_at: new Date().toISOString()
                })
                this.watchlist.push(response.data)
            } catch (error) {
                throw error
            }
        },

        async removeFromWatchList(movieId) {
            const userId = this.getCurrentUserId()
            try {
                const movieToRemove = this.watchlist.find(movie => movie.id === movieId && movie.userId === userId)
                if (movieToRemove) {
                    await axios.delete(`${LOCAL_API}/watchlist/${movieToRemove.id}`)
                    this.watchlist = this.watchlist.filter(movie => movie.id !== movieId)
                    return true
                }
                return false
            } catch (error) {
                console.error('Remove failed:', error)
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