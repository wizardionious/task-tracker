import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/completed',
    name: 'Completed',
    component: () => import('../pages/CompletedPage.vue'),
  },
  {
    path: '/trash',
    name: 'Trash',
    component: () => import('../pages/TrashPage.vue'),
  },
] as const

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
