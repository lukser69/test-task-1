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
    component: Auth,
    meta: { requiresNotAuth: true }
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
    meta: { requiresAuth: true }
  },
  {
    path: '/order-create',
    name: 'orderCreate',
    component: OrderCreate,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Если пользователь не авторизовался, то редиректить на auth
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = Boolean(localStorage.getItem('userData'));
  if (requiresAuth && !isAuthenticated) {
    next('/auth');
  } else {
    next();
  }
});

// Если пользователь авторизовался, то редиректить c auth на orders
router.beforeEach((to, from, next) => {
  const requiresNotAuth = to.matched.some(record => record.meta.requiresNotAuth);
  const isAuthenticated = Boolean(localStorage.getItem('userData'));
  if (requiresNotAuth && isAuthenticated) {
    next('/orders');
  } else {
    next();
  }
});


export default router
