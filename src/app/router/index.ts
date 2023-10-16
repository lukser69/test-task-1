import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { Auth, Orders, OrderCreate } from '@/pages'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/auth',
  },
  {
    path: '/auth',
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
    component: OrderCreate,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
