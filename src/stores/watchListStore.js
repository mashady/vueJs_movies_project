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
                const movieId = movie.id
                const existing = await axios.get(`${LOCAL_API}/watchlist?movieId=${movieId}&userId=${userId}`)
                if (existing.data.length > 0) return

                const movieCopy = { ...movie }
                delete movieCopy.id

                const response = await axios.post(`${LOCAL_API}/watchlist`, {
                    ...movieCopy,
                    movieId,            
                    userId,             
                    added_at: new Date().toISOString()
                })

                this.watchlist.push(response.data)
            } catch (error) {
                console.error('Add failed:', error)
                throw error
            }
        },

        async removeFromWatchList(movie) {
            /**
             * 
try {
                const { data } = await axios.get(`${LOCAL_API}/watchlist?movieId=${movieId}&userId=${userId}`)
                const movieToRemove = data[0]

                if (!movieToRemove) {
                    console.warn('Movie not found for deletion')
                    return false
                }

                this.watchlist = this.watchlist.filter(m => m.id !== movieToRemove.id)
                return true
            } catch (error) {
                console.error('Remove failed:', error)
                throw error
            }

             */
            //const userId = this.getCurrentUserId()
            await axios.delete(`${LOCAL_API}/watchlist/${movie}`)

            
        }
    },

    getters: {
        isInWatchList: (state) => (movieId) => {
            return state.watchlist.some(movie => movie.movieId === movieId)
        }
    }
})
