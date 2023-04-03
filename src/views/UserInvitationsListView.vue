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
    <main>
        <h1>Vos invitations : {{count}}</h1>
        <div>
            <template v-for=" invitation in invitationsList" :key="invitation.id">
                <router-link :to="`/event/${invitation.event.id}`">
                <div><h1>Vous etes invité à l'évenement : <b>{{invitation.event.title}}</b> </h1>
                <h1>Date de l'évenement :{{invitation.event.date}}  </h1>
                <h1>Lieu de l'évenement :{{invitation.event.lieu}}  </h1>
                <h1>Status de l'évenement :{{invitation.event.status}}  </h1>
                <h2>Status de l'invitation :{{invitation.invitation_status}} </h2></div></router-link>
                <hr>
            </template>

        </div>
    </main>
</template>