<script setup>

import {onMounted, reactive} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import router from "../router";
import {BASE} from "../../public/config";
import {useUserStore} from "../stores/user";

const user = useUserStore();

const route = useRoute();
let member = reactive({
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
    await axios.get(`${BASE}/users/${user.state.USER}`).then(response => {
        member.lastname = response.data.user.lastname;
        member.firstname = response.data.user.firstname;
        member.email = response.data.user.email;
        member.password = response.data.user.password;
        member.status = response.data.user.status;
    })
}

async function deleteAccount() {
    if (confirm("Voulez-vous vraiment supprimer votre compte ?")) {
        axios.delete(`https://api.reunionou.local:19043/users/${user.state.USER}`).catch((error) => {
            console.log(error);
        }).then(async () => {
            await router.push('/');
        })
    }
}

</script>

<template>
<section class="column pt-6 is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop is-6-widescreen is-offset-3-widescreen">
    <h1 class="title is-2 has-text-centered">Mon compte</h1>
    <div class="box">
        <p class="mb-4"><strong>Votre nom :</strong> {{member.lastname}}</p>
        <p class="mb-4"><strong>Votre prénom :</strong> {{member.firstname}}</p>
        <p class="mb-4"><strong>Votre adresse mail :</strong> {{member.email}}</p>        
    </div>
    <div class="is-flex is-flex-direction-column is-align-items-center">
        <router-link class="button is-link mb-3" :to="`/user/update/${member.id}`">
            <span class="icon is-medium mr-2"><i class="fas fa-edit"></i></span>
            Modifier votre compte
        </router-link>
        <button class="button is-primary is-outlined" @click="deleteAccount">
            <span class="icon is-medium mr-2"><i class="fas fa-trash-alt"></i></span>
            Supprimer votre compte
        </button>
    </div>
</section>
</template>
<style scoped>

</style>