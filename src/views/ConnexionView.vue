<script setup>
import axios from 'axios';
import { useUserStore } from '../stores/user';
import { BASE } from '../../public/config';
import { reactive } from 'vue';
import {useRouter} from "vue-router";

const router = useRouter();

const user = useUserStore();

const state = reactive({
    email: '',
    password: '',
    error: ''
})

async function connect() {
    await axios.post(`http://api.auth.local:19780/v1/signin`, {}, {auth: { username: state.email, password: state.password} }).then((response) => {
        user.state.TOKEN = response.data['access-token'];
    }).then(async (response) => {
        await axios.get(`http://api.auth.local:19780/v1/validate`, {
            headers: { Authorization: `Bearer ${user.state.TOKEN}` }
        }).then(async (response) => {
            user.state.USER = response.data.id;
            await router.push(`/user/${user.state.USER}/events`)
        }).catch((error) => {
            state.error = "Erreur, adresse e-mail ou mot de passe incorrect !";
        })
    })
}

</script>

<template>
    <section class="column pt-6 is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop is-6-widescreen is-offset-3-widescreen is-4-fullhd is-offset-4-fullhd">
        <h1 class="title is-2 has-text-centered">Connexion</h1>
        <form class="box" @submit.prevent="connect">
            <div class="field">
                <label class="label">E-mail</label>
                <div class="control">
                    <input class="input" required="required" v-model="state.email" type="email" placeholder="Votre e-mail">
                </div>
            </div>
            <div class="field">
                <label class="label">Mot de passe</label>
                <div class="control">
                    <input class="input" required="required" v-model="state.password" type="password" placeholder="Votre mot de passe">
                </div>
            </div>
            <div v-if="state.error !== ''">
                {{ state.error }}
            </div>
            <div class="is-flex is-flex-direction-column is-align-items-center">
                <button class="button is-link mb-3" type="submit">
                    <span class="icon is-medium mr-2">
                        <i class="fas fa-sign-in-alt"></i>
                    </span>
                    Connexion
                </button>
                <router-link class="button is-primary is-outlined" to="/inscription">
                    <span class="icon is-medium mr-2">
                        <i class="fas fa-user-plus"></i>
                    </span>
                    Créer un compte
                </router-link>
            </div>
        </form>
    </section>
</template>
<style scoped>

</style>