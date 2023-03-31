<script setup>

import {onMounted, reactive} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";

const route = useRoute();
const state = reactive({
    member: {},
})

onMounted(() => {
    console.log("user profile");
getUser()
});

async function getUser(){
    await axios.get(`https://api.reunionou.local:19043/users/${route.params.id}`).then(response =>{
        state.member = response.data.user;
        console.log(state.member)

    })
}
</script>

<template>
<section class="column pt-6 is-8 is-offset-2">
    <h1 class="title is-2 has-text-centered">Votre profil</h1>
    <div class="box">
        <p class="mb-4"><strong>Votre nom :</strong> {{state.member.lastname}}</p>
        <p class="mb-4"><strong>Votre prénom :</strong> {{state.member.firstname}}</p>
        <p class="mb-4"><strong>Votre adresse mail :</strong> {{state.member.email}}</p>        
    </div>
    <div class="is-flex is-justify-content-center">
        <router-link class="button is-link" :to="`/user/update/${state.member.id}`">Modifier votre compte</router-link>
    </div>
</section>
</template>
<style scoped>

</style>