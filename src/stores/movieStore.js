import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://api.themoviedb.org/3'

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    data: {},
    results: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchMovies(type, category = 'movie', page = 1) {
      this.loading = true
      this.error = null

      const endpoint = `${BASE_URL}/${category}/${type}?language=en-US&page=${page}`

      const options = {
        method: 'GET',
        url: endpoint,
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmI0OTlhOTlmYTU5MDBiNjFkMTgxOTE3ZDBkNDdhNyIsInN1YiI6IjY1NjM2MmYwN2RmZGE2NTkzMjY1YTNkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h8ApO6AOrN20N_-68defSJ4dd6kJV9OjEeJwN9Cv8qA',
        },
      }

      try {
        const response = await axios.request(options)
        this.data = response.data
        this.results = response.data.results
      } catch (err) {
        this.error = err
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
    },
  },
})
