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
<main>
    <div>
        <h1> Bonjour Madame/Monsieur {{state.member.firstname}} {{state.member.lastname}}  </h1>
        <h2> Votre Adresse mail : {{state.member.email}}</h2>
        <button><router-link :to="`/user/update/${state.member.id}`">Modifier votre compte</router-link></button>
    </div>
</main>
</template>
<style scoped>

</style>