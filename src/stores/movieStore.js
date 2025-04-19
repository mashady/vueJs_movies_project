import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmI0OTlhOTlmYTU5MDBiNjFkMTgxOTE3ZDBkNDdhNyIsInN1YiI6IjY1NjM2MmYwN2RmZGE2NTkzMjY1YTNkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h8ApO6AOrN20N_-68defSJ4dd6kJV9OjEeJwN9Cv8qA'

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    data: {},
    results: [],
    loading: false,
    error: null,
    genres: [],
    currentPage: 1,
    selectedGenre: null,
    totalPages: 1,
    itemsPerPage: 20
  }),

  getters: {
    filteredResults: (state) => {
      if (!state.selectedGenre) return state.results
      return state.results.filter(movie => 
        movie.genre_ids?.includes(state.selectedGenre)
      )
    }
  },

  actions: {
    async fetchMovies(type, category = 'movie', page = 1) {
      this.loading = true
      this.error = null
      this.currentPage = page

      const endpoint = `${BASE_URL}/${category}/${type}?language=en-US&page=${page}`

      try {
        const response = await axios.get(endpoint, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
          }
        })
        
        this.data = response.data
        this.results = response.data.results
        this.totalPages = response.data.total_pages
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async fetchGenres(category = 'movie') {
      this.loading = true
      this.error = null
    
      const endpoint = `${BASE_URL}/genre/${category}/list?language=en-US`
    
      try {
        const response = await axios.get(endpoint, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
          }
        })
        
        this.genres = response.data.genres
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async fetchTrending(category = 'movie', timeWindow = 'day', page = 1) {
      this.loading = true
      this.error = null
      this.currentPage = page

      const endpoint = `${BASE_URL}/trending/${category}/${timeWindow}?language=en-US&page=${page}`

      try {
        const response = await axios.get(endpoint, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
          }
        })
        
        this.data = response.data
        this.results = response.data.results
        this.totalPages = response.data.total_pages
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async fetchByGenre(genreId, page = 1) {
      this.loading = true
      this.error = null
      this.currentPage = page
      this.selectedGenre = genreId

      const endpoint = `${BASE_URL}/discover/movie`

      try {
        const response = await axios.get(endpoint, {
          params: {
            with_genres: genreId,
            page: page,
            language: 'en-US'
          },
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
          }
        })
        
        this.data = response.data
        this.results = response.data.results
        this.totalPages = response.data.total_pages
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async nextPage() {
      if (this.currentPage < this.totalPages) {
        const nextPage = this.currentPage + 1
        if (this.selectedGenre) {
          await this.fetchByGenre(this.selectedGenre, nextPage)
        } else {
          await this.fetchMovies('popular', 'movie', nextPage)
        }
      }
    },

    async prevPage() {
      if (this.currentPage > 1) {
        const prevPage = this.currentPage - 1
        if (this.selectedGenre) {
          await this.fetchByGenre(this.selectedGenre, prevPage)
        } else {
          await this.fetchMovies('popular', 'movie', prevPage)
        }
      }
    },

    clearFilters() {
      this.selectedGenre = null
      this.currentPage = 1
      this.fetchMovies('popular')
    }
  }
})