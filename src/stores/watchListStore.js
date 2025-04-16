import { defineStore } from 'pinia'
import axios from 'axios'

const LOCAL_API = 'http://localhost:3000'

export const useWatchListStore = defineStore('watchlist', {
    state: () => ({
        watchlist: [],
        loading: false,
        error: null,
        currentUserId: JSON.parse(localStorage.getItem('user'))?.id || null
    }),
    actions: {
        async fetchWatchList() {
            this.loading = true
            this.currentUserId = JSON.parse(localStorage.getItem('user'))?.id
            try {
                const response = await axios.get(`${LOCAL_API}/watchlist?userId=${this.currentUserId}`)
                this.watchlist = response.data
            } catch (err) {
                this.error = err
            } finally {
                this.loading = false
            }
        },

        async addToWatchList(movie) {
            try {
                const existing = await axios.get(`${LOCAL_API}/watchlist?id=${movie.id}&userId=${this.currentUserId}`)
                if (existing.data.length > 0) return

                const response = await axios.post(`${LOCAL_API}/watchlist`, {
                    ...movie,
                    userId: this.currentUserId,
                    added_at: new Date().toISOString()
                })
                this.watchlist.push(response.data)
            } catch (error) {
                throw error
            }
        },

        async removeFromWatchList(movieId) {
            try {
                const movieToRemove = this.watchlist.find(movie => movie.id === movieId)
                if (movieToRemove) {
                    await axios.delete(`${LOCAL_API}/watchlist/${movieToRemove.id}`)
                    this.watchlist = this.watchlist.filter(movie => movie.id !== movieId)
                    return true
                }
                return false
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
