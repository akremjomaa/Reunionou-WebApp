<script setup>

import {onMounted, reactive} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import router from "../router";
import {BASE} from "../../public/config";
import {useUserStore} from "../stores/user";

const route = useRoute();
const user = useUserStore();

let member = reactive({
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
    await axios.put(`http://api.reunionou.local:19080/users/${user.state.USER}`, {
        name: member.lastname,
        firstname: member.firstname,
        email: member.email,
        password: member.password
    }).then(response => {
        console.log(response);
    }).catch(error => console.log(error));

    await router.push(`/user/${user.state.USER}`);
}

async function getUser() {
    await axios.get(`${BASE}/users/${user.state.USER}`).then(response => {
        member.lastname = response.data.user.lastname;
        member.firstname = response.data.user.firstname;
        member.email = response.data.user.email;
        member.password = response.data.user.password;
        member.status = response.data.user.status;
    })
}
</script>
<template>
    <section class="column pt-6 is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop is-6-widescreen is-offset-3-widescreen is-4-fullhd is-offset-4-fullhd">
        <h1 class="title is-2 has-text-centered">Mettre à jour le profil</h1>
        <form class="box" @submit.prevent="putUser">
            <div class="field">
                <label class="label">Prénom</label>
                <div class="control">
                    <input class="input" v-model="member.firstname" required="required" placeholder="Prénom">
                </div>
            </div>

            <div class="field">
                <label class="label">Nom</label>
                <div class="control">
                    <input class="input" v-model="member.lastname" required="required" placeholder="Nom">
                </div>
            </div>

            <div class="field">
                <label class="label">E-mail</label>
                <div class="control">
                    <input class="input" v-model="member.email" required="required" type="email" placeholder="E-mail">
                </div>
            </div>

            <div class="field">
                <label class="label">Mot de Passe</label>
                <div class="control">
                    <input class="input" v-model="member.password" required="required" type="password" placeholder="Mot de Passe">
                </div>
            </div>

            <div class="is-flex is-flex-direction-column is-align-items-center">
                <button class="button is-link" type="submit">
                    <span class="icon is-medium mr-2">
                        <i class="fas fa-save"></i>
                    </span>
                    Enregistrer les modifications
                </button>
            </div>
        </form>
    </section>

</template>
<style scoped>

</style>