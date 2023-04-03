<script setup>
import { reactive } from 'vue'

const state = reactive({
    menuOuvert: false
});
</script>

<template>
  <nav v-if="$route.path !== '/DisplayDevice'" class="navbar is-fixed-top is-align-items-center" role="navigation" aria-label="main navigation">
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
      <div class="navbar-start">
        <router-link to="/user/2/events" class="navbar-item">
          Mes évènements
        </router-link>
        <router-link to="/user/1/invitations" class="navbar-item">
          Mes invitations
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <!--Navbar utilisateur connecté-->
          <div class="buttons my-0">
            <router-link to="/user/2">
              <span class="icon is-large">
                <i class="fas fa-2x fa-user"></i>
              </span>
            </router-link>
            <router-link to="/">
              <span class="icon is-large">
                <i class="fas fa-2x fa-sign-out-alt"></i>
              </span>
            </router-link>
          </div>
          
          <!--Navbar utilisateur déconnecté-->

          <div class="buttons my-0">
            <router-link to="/createAccount" class="button is-primary my-0">
              <strong>S'inscrire</strong>
            </router-link>
            <router-link to="/" class="button is-light my-0">
              Se connecter
            </router-link>
          </div>
        </div>
      </div>

    </div>
  </nav>
</template>

<style scoped></style>