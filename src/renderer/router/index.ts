import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const routes: Array<RouteRecordRaw> = [
  // Home
  {
    path: '/home',
    alias: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: 'home' */'../views/HomeView.vue'),
    meta: {
      title: 'views.home',
      requiresAuth: true
    }
  },

  // Authentication
  {
    path: '/auth/:action',
    name: 'auth',
    component: () => import(/* webpackChunkName: 'auth' */'../views/AuthView.vue'),
    meta: {
      requiresAuth: false
    }
  },
  { path: '/login', redirect: '/auth/login' },
  { path: '/register', redirect: '/auth/register' }
]

// Create the router
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Redirect to login if not logged in
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (getAuth().currentUser) {
      next()
    } else {
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          next()
        } else {
          next({
            path: '/auth/login',
            query: { redirect: to.fullPath }
          })
        }
      })()
    }
  } else {
    next()
  }
})

export default router
