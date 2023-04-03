<script setup>
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import {reactive} from "vue";
import axios from "axios";

const router = useRouter()

let member = reactive({
    firstname: '',
    name:'',
    email: '',
    password: '',
})
const checkPassword = ref('');
async function validationFormulaire() {
    if (member.password !== checkPassword.value) {
        alert("les mots de passe ne sont pas compatibles ! vérifiez de nouveau !")
    }
    else {
        axios.post('https://api.reunionou.local:19043/users/', {
           firstname : member.firstname , name : member.name , email : member.email , password : member.password
        }).then(function (response){
            console.log(checkPassword.value)

            console.log(response)
            if (response.message) {
                alert(response.message)
            } else {
                console.log(response)
                if (confirm("votre compte à été créé avec succés")) {
                    router.push('/connect');

                }
            } {

            }
        }).catch(error => console.log(error))

    }
}
</script>

<template>
    <main>
        <h1>Bienvenue à Reunionou</h1>
        <h2> Créer un compte</h2>
        <form @submit.prevent="validationFormulaire">
            <div class="field">
                <label class="label">Nom</label>
                <div class="control">
                    <input required="required" class="input " v-model="member.name" type="text"
                        placeholder="Entrez votre Nom ici ">
                </div>
            </div>
            <div class="field">
                <label class="label">Prénom</label>
                <div class="control">
                    <input required="required" class="input " v-model="member.firstname" type="text"
                           placeholder="Entrez votre Prénom ici ">
                </div>
            </div>
            <div class="field">
                <label class="label">E-mail</label>
                <div class="control">
                    <input class="input" v-model="member.email" required="required" type="email" placeholder="Entrez votre E-mail ici">

                </div>
            </div>

            <div class="field">
                <label class="label">Mot de Passe</label>
                <div class="control">
                    <input class="input" v-model="member.password" required="required" type="password"
                        placeholder="Entrez votre Mot de passe ici">
                </div>
            </div>
            <div class="field">
                <label class="label">Confirmer mot de passe</label>
                <div class="control has-icons-left has-icons-right">
                    <input class="input" v-model="checkPassword" required="required" type="password"
                        placeholder="Répeter votre Mot de passe ici">
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link" type="submit">Créer votre compte </button>
                </div>
            </div>
        </form>
        <div>
            <p>Vous avez deja un compte ?</p><router-link to="/connexion">Connexion</router-link>
        </div>

    </main>
</template>
