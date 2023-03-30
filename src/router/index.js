import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/createAccount',
      name: 'createAccount',
      component: () => import('../views/CreateUserAccountView.vue'),
    },
    {
      path: '/user/:id',
      name: 'user',
      component: () => import('../views/UserProfileView.vue'),
    },
    {
      path: '/user/update/:id',
      name: 'update-user',
      component: () => import('../views/UpdateUserProfileView.vue'),
    },
    {
      path: '/event/:id',
      name: 'event',
      component: () => import('../views/OneEventView.vue'),
    }
  ]
})

export default router