import { defineStore } from 'pinia'
import axios from 'axios'
import { IOrder } from '@/models'

interface OrdersState {
  orders: IOrder[]
}

export const useAppStore = defineStore('app', {
  state: (): OrdersState => ({
    orders: [],
  }),
  actions: {
    getOrders() {
      axios
        .get('http://localhost:3000/events')
        .then((response) => this.orders = response.data)
        .catch((error) => console.log('Error', error.message))
    },
    async createOrder(order: IOrder) {
      let isResponse = true
      await axios
        .post('http://localhost:3000/events', order)
        .then((response) => {
          this.orders.push(response.data);
        })
        .catch((error) => {
          console.log('Error', error.message)
          isResponse = false;
        })
      return isResponse
    }
  }
})