import { defineStore } from 'pinia'
import axios from 'axios'
import { IOrder } from '@/models'

interface OrdersState {
  orders: IOrder[]
}

export const useOrdersStore = defineStore('app', {
  state: (): OrdersState => ({
    orders: [],
  }),
  actions: {
    async getOrders() {
      try {
        const response = await axios.get('/events')
        this.orders = response.data
      } catch (error) {
        console.error('Error', error)
      }
    },
    async createOrder(order: IOrder) {
      let isResponse = false;

      try {
        const response = await axios.post('http://localhost:3000/events', order)
        this.orders.push(response.data);
        isResponse = true;
      } catch (error) {
        console.error('Error', error)
      }

      return isResponse
    },
    async setStatusDone(order: IOrder) {
      let isResponse = false;

      try {
        const response = await axios.put(`http://localhost:3000/events/${order.id}`, order)

        const findOrder = this.orders.find((item) => (item as IOrder).id === (order as IOrder).id);
        if (findOrder) {
          (findOrder as IOrder).status = response.data.status
        }

        isResponse = true;
      } catch (error) {
        console.error('Error', error)
      }

      return isResponse
    },
    async deleteOrder(order: IOrder) {
      let isResponse = false;

      try {
        await axios.delete(`http://localhost:3000/events/${order.id}`)

        const findIndexOrder = this.orders.findIndex((item) => (item as IOrder).id === order.id);
        if (findIndexOrder) {
          this.orders.splice(findIndexOrder, 1)
        }

        isResponse = true;
      } catch (error) {
        console.error('Error', error)
      }

      return isResponse
    },
  }
})