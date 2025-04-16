import { defineStore } from 'pinia'

export const useMovieCalendarStore = defineStore('movieCalendar', {
  state: () => ({
    events: [],
    loading: false, 
    error: null,
    selectedMovie: null
  }),

  actions: {
    async fetchEvents(userId) {
      this.loading = true
      this.error = null

      try {
        const res = await fetch(`http://localhost:3000/calendar?userId=${userId}`)
        
        if (!res.ok) {
          throw new Error(`Failed to fetch movies (${res.status})`)
        }

        const data = await res.json()
        this.events = data.map(item => ({
          start: item.date,
          end: item.date,
          title: item.title,
          id: item.id,
          description: item.description || '',
          watched: item.watched || false,
          cssClass: item.watched ? 'movie-watched' : 'movie-unwatched'
        }))
      } catch (e) {
        console.error('Error fetching calendar events:', e)
        this.error = 'Failed to load movie schedule. Please try again later.'
      } finally {
        this.loading = false
      }
    },

    setSelectedMovie(movie) {
      this.selectedMovie = movie
    },

    clearSelectedMovie() {
      this.selectedMovie = null
    },

    
    async addEvent(movieData, userId) {
      this.loading = true
      this.error = null

      try {
        const response = await fetch('http://localhost:3000/calendar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...movieData, userId }) 
        })

        if (!response.ok) {
          throw new Error(`Failed to add movie (${response.status})`)
        }

        const newMovie = await response.json()

        this.events.push({
          start: newMovie.date,
          end: newMovie.date,
          title: newMovie.title,
          id: newMovie.id,
          description: newMovie.description || '',
          watched: newMovie.watched || false,
          cssClass: newMovie.watched ? 'movie-watched' : 'movie-unwatched'
        })

        return newMovie
      } catch (e) {
        console.error('Error adding movie event:', e)
        this.error = 'Failed to add movie to calendar. Please try again.'
        throw e
      } finally {
        this.loading = false
      }
    },

    async markAsWatched(movieId) {
      try {
        const response = await fetch(`http://localhost:3000/calendar/${movieId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ watched: true })
        })

        if (!response.ok) {
          throw new Error(`Failed to update movie (${response.status})`)
        }

        this.events = this.events.map(event => {
          if (event.id === movieId) {
            return { ...event, watched: true, cssClass: 'movie-watched' }
          }
          return event
        })

        if (this.selectedMovie && this.selectedMovie.id === movieId) {
          this.selectedMovie = { ...this.selectedMovie, watched: true, cssClass: 'movie-watched' }
        }

        return true
      } catch (e) {
        console.error('Error marking movie as watched:', e)
        this.error = 'Failed to update movie status'
        throw e
      }
    },

    async deleteEvent(movieId) {
      try {
        const response = await fetch(`http://localhost:3000/calendar/${movieId}`, {
          method: 'DELETE'
        })

        if (!response.ok) {
          throw new Error(`Failed to delete movie (${response.status})`)
        }

        this.events = this.events.filter(event => event.id !== movieId)

        if (this.selectedMovie && this.selectedMovie.id === movieId) {
          this.selectedMovie = null
        }

        return true
      } catch (e) {
        console.error('Error deleting movie event:', e)
        this.error = 'Failed to delete movie from calendar. Please try again.'
        throw e
      }
    }
  }
})
