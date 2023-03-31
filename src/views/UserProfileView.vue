<script setup>

import {onMounted, reactive} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import router from "../router";

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
    await axios.get(`https://api.reunionou.local:19043/users/${route.params.id}`).then(response => {
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
    <main>
        <div>
            <h1> Bonjour Madame/Monsieur {{ member.firstname }} {{ member.lastname }} </h1>
            <h2> Votre Adresse mail : {{ member.email }}</h2>
            <button>
                <router-link :to="`/user/update/${member.id}`">Modifier votre compte</router-link>
            </button>
            <button @click="deleteAccount">Supprimer votre compte</button>
        </div>
    </main>
</template>
<style scoped>

</style>