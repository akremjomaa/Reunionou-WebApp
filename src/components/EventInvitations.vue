<script setup>

import {useRoute} from "vue-router";
import {onMounted} from "vue";
import axios from "axios";
import {ref} from "@vue/reactivity";

const route = useRoute();
const invitationList = ref([]);
const count = ref(0);

onMounted(() => {
    console.log("Liste des invitations d'un évenement");
    getInvitations()

});

async function getInvitations(){
    await axios.get(`https://api.reunionou.local:19043/events/${route.params.id}/invitations`).then(response =>{
        console.log(response.data)
        invitationList.value= response.data.invitations;
        count.value = response.data.count;
        console.log(invitationList.value)
        console.log(count.value)

    })
}

</script>

<template>
    <main>
        <div>
            <h2> List des invités : {{count}}</h2>
            <template v-for="invitation in invitationList" :key="invitation.id">
               <div> <b> {{invitation.invited_name}} {{invitation.invited_firstName}}</b> {{invitation.invitation_status}}</div>
            </template>
        </div>
    </main>
</template>
<style scoped>

</style>