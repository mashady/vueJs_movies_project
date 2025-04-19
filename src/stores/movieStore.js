// stores/movieStore.js
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
    selectedYear: null,
    totalPages: 1,
    itemsPerPage: 20
  }),

  getters: {
    filteredResults: (state) => {
      let filtered = state.results
      if (state.selectedGenre) {
        filtered = filtered.filter(movie =>
          movie.genre_ids?.includes(state.selectedGenre)
        )
      }
      if (state.selectedYear) {
        filtered = filtered.filter(movie =>
          movie.release_date?.startsWith(state.selectedYear.toString())
        )
      }
      return filtered
    }
  },

  actions: {
    async fetchMovies(type = 'popular', category = 'movie', page = 1) {
      this.loading = true
      this.error = null
      this.currentPage = page
      this.results = []
      this.data = {}

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
      this.results = []
      this.data = {}

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

    async fetchByFilters({ genreId = null, year = null, page = 1 }) {
      this.loading = true
      this.error = null
      this.currentPage = page
      this.results = []
      this.data = {}

      this.selectedGenre = genreId
      this.selectedYear = year

      const endpoint = `${BASE_URL}/discover/movie`

      const params = {
        page,
        language: 'en-US'
      }

      if (genreId) {
        params.with_genres = genreId
      }

      if (year) {
        params.primary_release_year = year
      }

      try {
        const response = await axios.get(endpoint, {
          params,
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
        await this.fetchByFilters({
          genreId: this.selectedGenre,
          year: this.selectedYear,
          page: nextPage
        })
      }
    },

    async prevPage() {
      if (this.currentPage > 1) {
        const prevPage = this.currentPage - 1
        await this.fetchByFilters({
          genreId: this.selectedGenre,
          year: this.selectedYear,
          page: prevPage
        })
      }
    },

    async clearFilters() {
      this.selectedGenre = null
      this.selectedYear = null
      this.currentPage = 1
      await this.fetchByFilters({ page: 1 })
    }
  }
})
