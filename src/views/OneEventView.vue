<script setup>

import {useRoute} from "vue-router";
import {onMounted, reactive} from "vue";
import axios from "axios";
import Invitations from '@/components/EventInvitations.vue'
import Comments from  '@/components/EventComments.vue'
const route = useRoute();

const state = reactive({
    event: {},
    invitations : [],
    creator : {},
    comments : [],
    status : '',
})

onMounted(() => {
    console.log("one event view");
    getEvent()

});

async function getEvent(){
    await axios.get(`https://api.reunionou.local:19043/events/${route.params.id}?embed=invitations,user,comments`).then(response =>{
        console.log(response.data)
        state.event = response.data.event;
        state.creator = response.data.event.user;
        state.invitations = response.data.event.invitations;
        state.comments = response.data.event.comments;

    })
}
function getStatus(){
    return state.event.event_status ? 'déja passé' : 'à venir'
}
</script>

<template>
    <main>
        <div>
            <h2>Titre : {{state.event.event_title}}</h2>
            <h3> Description : {{state.event.event_description}}</h3>
            <h3> Date de l'evenement : {{state.event.event_date}}</h3>
            <h3> Lieu de l'evenement : {{state.event.event_place}} </h3>
            <h3> Statut : {{getStatus()}} </h3>
            <h3>Evenement crée par : {{state.creator.firstname}}  {{state.creator.name}} </h3>
        </div>
        <div>
            <Invitations></Invitations>
        </div>
        <div>
            <Comments></Comments>
        </div>
    </main>
</template>
<style scoped>

</style>