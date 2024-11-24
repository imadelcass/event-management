import { defineStore } from 'pinia'
import axios from '@/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),

  getters: {
    isAuthenticated() {
      return this.user !== null
    },
    isAdmin() {
      return this.user && this.user.is_admin
    }
  },

  actions: {
    init() {
      return new Promise((resolve) => {
        const token = localStorage.getItem('token')

        if (token) {
          axios
            .get('init', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then(({ data }) => {
              this.user = data.user
              resolve(data)
            })
            .catch(() => {
              this.user = null
              resolve()
            })
        } else {
          this.user = null
          this.token = null
          resolve()
        }
      })
    },
    login(email, password) {
      return new Promise((resolve) => {
        axios
          .post('login', { email, password })
          .then(({ data }) => {
            this.user = data.user
            this.token = data.token
            localStorage.setItem('token', data.token)
            resolve(data)
            window.location.reload()
          })
          .catch(() => {
            resolve()
          })
      })
    },

    logout() {
      return new Promise((resolve) => {
        axios.post('logout').then(() => {
          this.user = null
          localStorage.removeItem('token')
          window.location.reload()
          resolve()
        })
      })
    }
  }
})
