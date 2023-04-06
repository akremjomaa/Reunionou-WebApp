<script setup>
import { reactive } from 'vue'
import {useUserStore} from "../stores/user";

const state = reactive({
    menuOuvert: false
});

const user = useUserStore();

const navUserConnected = reactive({
    value: false
    })
function logOut() {
    if(!confirm('Voulez-vous vraiment vous déconnecter ?')) return;
    user.state.TOKEN = '';
    user.state.USER = '';
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

      <div class="navbar-start" v-if="user.state.USER !== ''">
        <router-link :to="`/user/${user.state.USER}/events`" class="navbar-item">
            <span class="icon is-medium mr-1">
                <i class="fas fa-calendar-alt"></i>
            </span>
          Mes évènements
        </router-link>
        <router-link :to="`/user/${user.state.USER}/invitations`" class="navbar-item">
            <span class="icon is-medium mr-1">
                <i class="fas fa-envelope"></i>
            </span>
          Mes invitations
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">


          <div class="buttons my-0" v-if="user.state.USER !== ''">
            <router-link to="/event/new" class="button is-primary my-1 pl-4">
            <span class="icon is-medium mr-2">
              <i class="fas fa-plus"></i>
            </span>
                Créer un évènement
            </router-link>
            <router-link :to="`/user/${user.state.USER}`" class="button is-primary is-outlined my-1 pl-4">
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
          

          <div class="buttons my-0" v-if="user.state.USER === ''">
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