<script setup>
import { onMounted } from '@vue/runtime-core';
import axios from "axios";
import {ref} from "@vue/reactivity";
import {BASE} from "../../public/config";

const invitationsList = ref([]);
const count = ref(0);

onMounted(() => {

    console.log('list of invitations')
    getInvitations()

})

async  function getInvitations() {
    await axios.get(`${BASE}/users/1/invitations`).then(response =>{
        console.log(response.data)
        invitationsList.value= response.data.invitations;
        count.value = response.data.count;
        console.log(invitationsList.value)
        console.log(count.value)

    })
}


</script>
<template>
    <section class="column pt-6 is-10-tablet is-offset-1-tablet is-8-widescreen is-offset-2-widescreen">
        <h1 class="title is-2 has-text-centered">Vos invitations ({{count}})</h1>
        <div>
            <template v-for="invitation in invitationsList" :key="invitation.id">
                <router-link :to="`/event/${invitation.event.id}`">
                    <div class="box">
                        <h2>Vous etes invité à l'évenement : <strong>{{invitation.event.title}}</strong> </h2>
                        <h3>Date :{{invitation.event.date}}</h3>
                        <h3>Lieu :{{invitation.event.lieu}}</h3>
                        <h3>Status de l'évenement :{{invitation.event.status}}</h3>
                        <h3>Status de l'invitation :{{invitation.invitation_status}}</h3>
                    </div>
                </router-link>
            </template>

        </div>
    </section>
</template>