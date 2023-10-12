import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Auth from '@/views/Auth.vue'
import Orders from '@/views/Orders.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'auth',
    component: Auth
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders
  },
  {
    path: '/order-create',
    name: 'orderCreate',
    component: () => import('@/views/OrderCreate.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
