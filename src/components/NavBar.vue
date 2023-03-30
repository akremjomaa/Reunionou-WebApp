<script setup>

</script>

<template>
  <nav v-if="$route.path !== '/DisplayDevice'" class="navbar pl-4 pr-4" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <img src="/logo.png" alt="logo" width="35" height="35">
      </router-link>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">
          Mes évènements
        </router-link>
        <router-link to="/" class="navbar-item">
          Mes invitations
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <!--Navbar utilisateur connecté-->
          <div class="buttons">
            <router-link to="/">
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

          <div class="buttons">
            <router-link to="/" class="button is-primary">
              <strong>S'inscrire</strong>
            </router-link>
            <router-link to="/" class="button is-light">
              Se connecter
            </router-link>
          </div>
        </div>
      </div>

    </div>
  </nav>
</template>

<style scoped></style>