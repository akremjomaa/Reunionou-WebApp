<script setup>
import { reactive } from 'vue'

const state = reactive({
    menuOuvert: false
});

const navUserConnected = reactive({
    value: false
    })
function logOut() {
    if(!confirm('Voulez-vous vraiment vous déconnecter ?')) return;
    session.endSession();
    router.push('/');
}
</script>

<template>
  <nav class="navbar is-fixed-top is-align-items-center" role="navigation" aria-label="main navigation">
    <div class="navbar-brand is-align-items-center">
      <router-link to="/" class="navbar-item">
        <img src="/logo.png" alt="logo" width="40" height="40">
      </router-link>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="state.menuOuvert=!state.menuOuvert">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{'is-active':state.menuOuvert}">
      <div v-if="navUserConnected.value" class="navbar-start">
        <router-link to="/user/:id/events" class="navbar-item">
            <span class="icon is-medium mr-1">
                <i class="fas fa-calendar-alt"></i>
            </span>
          Mes évènements
        </router-link>
        <router-link to="/user/:id/invitations" class="navbar-item">
            <span class="icon is-medium mr-1">
                <i class="fas fa-envelope"></i>
            </span>
          Mes invitations
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">

          <div v-if="navUserConnected.value" class="buttons my-0">
            <router-link to="/event/new" class="button is-primary my-1 pl-4">
            <span class="icon is-medium mr-2">
              <i class="fas fa-plus"></i>
            </span>
                Créer un évènement
            </router-link>
            <router-link to="/user/:id" class="button is-primary is-outlined my-1 pl-4">
              <span class="icon is-medium mr-2">
                <i class="fas fa-user"></i>
              </span>
              Mon compte
            </router-link>
            <router-link @click="logOut" to="/" class="button is-primary is-outlined my-1 pl-4">
              <span class="icon is-medium mr-2">
                <i class="fas fa-power-off"></i>
              </span>
                Se déconnecter
            </router-link>
          </div>
          

          <div v-if="!navUserConnected.value" class="buttons my-0">
            <router-link to="/inscription" class="button is-primary my-1 pl-4">
                <span class="icon is-medium mr-2">
                    <i class="fas fa-user-plus"></i>
                </span>
              S'inscrire
            </router-link>
            <router-link to="/connexion" class="button is-primary is-outlined my-1 pl-4">
                <span class="icon is-medium mr-2">
                    <i class="fas fa-sign-in-alt"></i>
                </span>
              Se connecter
            </router-link>
          </div>
          
        </div>
      </div>

    </div>
  </nav>
</template>

<style scoped></style>