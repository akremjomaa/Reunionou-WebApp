<script setup>

</script>

<template>
  <nav v-if="$route.path !== '/DisplayDevice'" class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <a href="#">Link</a>
      </router-link>
    </div>
      <div class="navbar-menu">
      </div>
  </nav>
</template>

<style scoped>

</style>