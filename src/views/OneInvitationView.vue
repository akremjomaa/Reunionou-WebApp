<script setup>

import {useRoute} from "vue-router";
import { onMounted, reactive} from "vue";
import axios from "axios";
import Invitations from '@/components/Invitations.vue'
import Comments from  '@/components/EventComments.vue'
import {BASE} from "../../public/config";
import {useUserStore} from "@/stores/user";
const route = useRoute();
const user = useUserStore();
const state = reactive({
    invitation: {},
    event : {},
    invited : {},
    comments : [],
    status : false,
    id:0,
    currentDateTime : new Date(),
})
onMounted(() => {
    getInvitation()
    checkStatus()

});

async function getInvitation(){

    await axios.get(`${BASE}/invitations/${route.params.id}?embed=event,invited`).then(response =>{
        state.invitation = response.data.invitation;
        state.id = response.data.invitation.event.id
        state.invited = response.data.invitation.invited;
        state.event = response.data.invitation.event;
        if ((state.invitation.status === 'accepté') || (state.invitation.status === 'refusé'))
        {
            user.invitationStatus = true
        }else{
            user.invitationStatus = false
        }
    })
}
function checkStatus(){
    if (state.currentDateTime> state.event.date){
        state.event.status = "déja passé"
    } else {
        state.event.status = "à venir"
    }
}
async function replyInvitation(newStatus){
    await axios.put(`${BASE}/invitations/${route.params.id}`,{
        status : newStatus,
    }).then(response =>{
        console.log(response.data)
        user.invitationStatus = true


    }).catch(error => {
        console.error(error);
    });
}
function accept() {
    replyInvitation('accepté');
}

function refuse() {
    replyInvitation('refusé');
}

</script>

<template>
    <main>
        <div><h1>Mr/Ms <b>{{state.invited.firstname}} {{state.invited.name}}</b> vous etes invités à cet évènement :</h1></div>
        <div>
            <h2>Titre : {{state.event.title}}</h2>
            <h3> Description : {{state.event.description}}</h3>
            <h3> Date de l'evenement : {{state.event.date}}</h3>
            <h3> Lieu de l'evenement : {{state.event.lieu}} </h3>
            <h3> Statut : {{state.event.status}} </h3>
        </div>
        <div>
            <div v-if="state.id !== 0">
            <Invitations :idEvent="state.id"></Invitations>
            </div>
        </div>
        <div v-if="!(user.invitationStatus)">
            <p>Êtes-vous disponible pour cet événement ?</p>
            <button @click="accept">Accepter</button>
            <button @click="refuse">Refuser</button>
        </div>
        <div>
            <Comments></Comments>
        </div>
    </main>
</template>
<style scoped>

</style>