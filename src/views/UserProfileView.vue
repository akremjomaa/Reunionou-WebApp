<script setup>

import {onMounted, reactive} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import router from "../router";
import {BASE} from "../../public/config";

const route = useRoute();
let member = reactive({
    id: {},
    lastname: '',
    firstname: '',
    email: '',
    password: '',
    status: ''
})

onMounted(() => {
    console.log("user profile");
    getUser()
});

async function getUser() {
    await axios.get(`${BASE}/users/${route.params.id}`).then(response => {
        console.log(response.data.user);
        member.id = response.data.user.id;
        member.lastname = response.data.user.lastname;
        member.firstname = response.data.user.firstname;
        member.email = response.data.user.email;
        member.password = response.data.user.password;
        member.status = response.data.user.status;
    })
}

async function deleteAccount() {
    if (confirm("Voulez-vous vraiment supprimer votre compte ?")) {
        axios.delete(`https://api.reunionou.local:19043/users/${member.id}`).catch((error) => {
            console.log(error);
        }).then(async () => {
            await router.push('/');
        })
    }
}

</script>

<template>
<section class="column pt-6 is-8 is-offset-2">
    <h1 class="title is-2 has-text-centered">Votre profil</h1>
    <div class="box">
        <p class="mb-4"><strong>Votre nom :</strong> {{member.lastname}}</p>
        <p class="mb-4"><strong>Votre prénom :</strong> {{member.firstname}}</p>
        <p class="mb-4"><strong>Votre adresse mail :</strong> {{member.email}}</p>        
    </div>
    <div class="is-flex is-flex-direction-column is-align-items-center">
        <router-link class="button is-link" :to="`/user/update/${member.id}`">Modifier votre compte</router-link>
        <button class="button is-light" @click="deleteAccount">Supprimer votre compte</button>
    </div>
</section>
</template>
<style scoped>

</style>