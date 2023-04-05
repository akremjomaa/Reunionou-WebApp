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
      path: '/user/:id/invitations',
      name: 'userInvitations',
      component: () => import('../views/UserInvitationsListView.vue'),
    },
    {
      path: '/user/:id/events',
      name: 'userEvents',
      component: () => import('../views/UserEventsListView.vue'),
    },
    {
      path: '/event/:id/invite',
      name: 'invite',
      component: () => import('../views/InviteVue.vue'),
    },
    {
      path: '/event/:id',
      name: 'event',
      component: () => import('../views/OneEventView.vue'),
    },
    {
      path: '/invitation/:id',
      name: 'invitation',
      component: () => import('../views/OneInvitationView.vue'),
    }
  ]
})

export default router