<script setup>
import { onMounted } from '@vue/runtime-core';
import axios from "axios";
import {ref} from "@vue/reactivity";
import {BASE} from "../../public/config";
import {reactive} from "vue";
import {useUserStore} from "../stores/user";

const invitationsList = ref([]);
const count = ref(0);
const user = useUserStore();
let state = reactive({
    inv : []
})

onMounted(() => {
    getInvitations()

})

async  function getInvitations() {

    await axios.get(`${BASE}/users/${user.state.USER}/invitations`).then(response =>{
    
        invitationsList.value= response.data.invitations;

        count.value = response.data.count;
    console.log(invitationsList.value)

    })
}
</script>
<template>
    <section class="column pt-6 is-10-tablet is-offset-1-tablet is-8-widescreen is-offset-2-widescreen">
        <h1 class="title is-2 has-text-centered">Vos invitations ({{count}})</h1>
        <div>
            <template v-for="invitation in invitationsList" :key="invitation.id">

                <router-link :to="`/invitation/${invitation.id}`">
                    <div class="box">
                        <h2>Vous etes invité à l'évenement : <strong>{{invitation.title}}</strong> </h2>
                        <h3>Date :{{invitation.date}}</h3>
                        <h3>Lieu :{{invitation.lieu}}</h3>
                        <h3>Status de l'évenement :{{invitation.event_status}}</h3>
                        <h3>Status de l'invitation :{{invitation.status}}</h3>
                    </div>
                </router-link>

            </template>

        </div>
    </section>
</template>