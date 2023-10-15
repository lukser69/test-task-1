import { defineStore } from 'pinia'
import axios from 'axios'

export const useAppStore = defineStore('app', {
  state: () => ({
    orders: [],
  }),
  actions: {
    getOrders() {
      axios
        .get('http://localhost:3000/events')
        .then((response) => this.orders = response.data)
        .catch((error) => console.log('Error', error.message))
    },
  }
})