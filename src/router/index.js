import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'Accueil' },
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/inscription',
      name: 'inscription',
      meta: { title: 'Inscription' },
      component: () => import('../views/CreateUserAccountView.vue'),
    },
    {
      path: '/connexion',
      name: 'connexion',
      meta: { title: 'Connexion' },
      component: () => import('../views/ConnexionView.vue'),
    },
    {
      path: '/user/:id',
      name: 'user',
      meta: { title: 'Profil' },
      component: () => import('../views/UserProfileView.vue'),
    },
    {
      path: '/user/update/:id',
      name: 'update-user',
      meta: { title: 'Mettre à jour le profil' },
      component: () => import('../views/UpdateUserProfileView.vue'),
    },
    {
      path: '/user/:id/invitations',
      name: 'userInvitations',
      meta: { title: 'Liste des invitations' },
      component: () => import('../views/UserInvitationsListView.vue'),
    },
    {
      path: '/user/:id/events',
      name: 'userEvents',
      meta: { title: 'Liste des évènements' },
      component: () => import('../views/UserEventsListView.vue'),
    },
    {
      path: '/event/:id/invite',
      name: 'invite',
      meta: { title: 'Invitation' },
      component: () => import('../views/InviteVue.vue'),
    },
    {
      path: '/event/:id',
      name: 'event',
      meta: { title: 'Évènement' },
      component: () => import('../views/OneEventView.vue'),
    },
    {

      path: '/invitation/:id',
      name: 'invitation',
      component: () => import('../views/OneInvitationView.vue'),
    },
    {
      path: '/event/new',
      name: 'new-event',
      meta: { title: 'Créer un évènement' },
      component: () => import('../views/CreateEventView.vue'),
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log(to);
  document.title = to.meta.title + " | Reunionou Web App";
  next();
});

export default router