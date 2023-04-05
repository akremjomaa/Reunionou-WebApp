<script setup>

import {useRoute} from "vue-router";
import {onMounted, reactive} from "vue";
import axios from "axios";
import Invitations from '@/components/Invitations.vue'
import Comments from  '@/components/EventComments.vue'
import {BASE} from "../../public/config";
const route = useRoute();


const state = reactive({
    invitation: {},
    event : {},
    invited : {},
    comments : [],
    status : '',
    eventFormVisible : false,
    event_date_us: {},
    currentDateTime : new Date(),
    coordinates : [],
    lat : 0.0,
    long : 0.0,
    id : 0


})

onMounted(() => {
    getInvitation()
    checkStatus()
});


async function getInvitation(){

    await axios.get(`${BASE}/invitations/${route.params.id}?embed=event,user`).then(response =>{
        state.invitation = response.data.invitation;
        state.invited = response.data.invitation.user;
        state.event = response.data.invitation.event;
        state.id = response.data.invitation.event.id
    })
}
function checkStatus(){
    if (state.currentDateTime> state.event.date){
        state.event.status = "déja passé"
    } else {
        state.event.status = "à venir"
    }
}


</script>

<template>
    <main>
        <div><h1>Mr/Ms {{state.invited.firstname}} {{state.invited.name}} vous etes invités à cet évènement :</h1></div>
        <div>
            <h2>Titre : {{state.event.title}}</h2>
            <h3> Description : {{state.event.description}}</h3>
            <h3> Date de l'evenement : {{state.event.date}}</h3>
            <h3> Lieu de l'evenement : {{state.event.lieu}} </h3>
            <h3> Statut : {{state.event.status}} </h3>
        </div>
        <div>
            <div v-if="state.id !== 0">
            <Invitations :eventId="state.id"></Invitations>
            </div>
        </div>
        <div>
            <Comments></Comments>
        </div>
    </main>
</template>
<style scoped>

</style>