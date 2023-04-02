<script setup>
import NavBar from '@/components/NavBar.vue';
import {onMounted, provide, reactive} from 'vue'
import {useRouter} from 'vue-router'
import mitt from 'mitt'

const state = reactive({
  appReady: false,
})
const bus = mitt();
provide('bus', bus)
const router = useRouter()
provide('router', router)

onMounted(() => {
  start();
});

function start() {
  state.appReady = true;
}
</script>

<template>
  <NavBar/>
  <main class="section">
    <template v-if="state.appReady">

      <RouterView/>
    </template>
  </main>
</template>

<style scoped>
</style>