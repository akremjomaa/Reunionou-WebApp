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
    getUser();
});

async function putUser() {
    await axios.put(`https://api.reunionou.local:19043/users/${route.params.id}`, {
        name: member.lastname,
        firstname: member.firstname,
        email: member.email,
        password: member.password
    }).then(response => {
        console.log(response);
    }).catch(error => console.log(error));

    await router.push(`/user/${member.id}`);
}

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
</script>
<template>
    <main>
        <form @submit.prevent="putUser">

            <div>
                <label>Prénom</label>
                <div>
                    <input class="input" v-model="member.firstname" required="required" placeholder="Prénom">
                </div>
            </div>

            <div>
                <label>Nom</label>
                <div>
                    <input class="input" v-model="member.lastname" required="required" placeholder="Nom">
                </div>
            </div>

            <div>
                <label>E-mail</label>
                <div>
                    <input class="input" v-model="member.email" required="required" type="email" placeholder="E-mail">
                </div>
            </div>

            <div>
                <label>Mot de Passe</label>
                <div>
                    <input v-model="member.password" required="required" type="password" placeholder="Mot de Passe">
                </div>
            </div>

            <div>
                <div>
                    <button type="submit">Mettre à jour vos informations ?</button>
                </div>
            </div>
        </form>
    </main>

</template>
<style scoped>

</style>