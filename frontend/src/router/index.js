import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore()
  await authStore.init()

  const isAuthenticated = authStore.isAuthenticated

  if (isAuthenticated && to.name == 'login') {
    next({ name: 'home' })
  } else if (!isAuthenticated && to.name != 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
