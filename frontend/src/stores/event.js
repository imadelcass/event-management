import { defineStore } from 'pinia'
import axios from '@/axios'

export const useEventStore = defineStore('events', {
  state: () => ({
    events: [],
  }),

  actions: {
    fetch(params) {
      return new Promise((resolve) => {
        axios
          .get('events', { params })
          .then(({ data }) => resolve(data))
          .catch(() => resolve())
      })
    },

    add(order) {
      return new Promise((resolve, reject) => {
        axios
          .post('events', order)
          .then(({ data }) => resolve(data))
          .catch(() => reject())
      })
    },

    update(order) {
      return new Promise((resolve, reject) => {
        axios
          .put(`events/${order.id}`, order)
          .then(({ data }) => resolve(data))
          .catch(() => reject())
      })
    },

    delete(id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`events/${id}`)
          .then(({ data }) => resolve(data))
          .catch(() => reject())
      })
    },
    rsvp(id) {
      return new Promise((resolve, reject) => {
        axios
          .post(`events/${id}/rsvp`)
          .then(({ data }) => resolve(data))
          .catch(() => reject())
      })
    }
  }
})
