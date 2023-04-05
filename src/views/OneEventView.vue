<script setup>

import {useRoute} from "vue-router";
import {onMounted, reactive} from "vue";
import axios from "axios";
import Invitations from '@/components/EventInvitations.vue'
import Comments from  '@/components/EventComments.vue'
import {BASE} from "../../public/config";
const route = useRoute();


const state = reactive({
    event: {},
    id : 0,
    invitations : [],
    creator : {},
    comments : [],
    status : '',
    eventFormVisible : false,
    currentDateTime : new Date(),
    coordinates : [],
    lat : 0.0,
    long : 0.0


})

onMounted(() => {
    getEvent()
checkStatus()
});

async function geocodeAddress(address) {
    const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            address
        )}&format=json&limit=1`
    );
    if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return [lat, lon];
    } else {
        throw new Error("Adresse introuvable");
    }
}

async function getEvent(){

    await axios.get(`${BASE}/events/${route.params.id}?embed=invitations,user,comments`).then(response =>{
        console.log(response.data)
        state.event = response.data.event;
        state.id = response.data.event.id;
        state.creator = response.data.event.user;
        state.invitations = response.data.event.invitations;
        state.comments = response.data.event.comments;

    })
    state.coordinates = await geocodeAddress(state.event.event_place);
}
 function checkStatus(){
    if (state.currentDateTime> state.event.event_date){
        state.event.event_status = "déja passé"
    } else {
         state.event.event_status = "à venir"
     }


}
function modeUpdateEvent() {
    state.eventFormVisible = true;
}
async function updateEvent(){
    await axios.put(`${BASE}/events/${route.params.id}`,{
        event_title : state.event.event_title,
        event_description :state.event.event_description,
        event_place : state.event.event_place,
        event_date : state.event.event_date
    }).then(response =>{
        console.log(response.data)
        state.eventFormVisible = false

    })
}
</script>

<template>
    <main><div v-if="state.eventFormVisible">
        <form @submit.prevent="updateEvent">
            <div>
                <label>Titre</label>
                <input v-model="state.event.event_title"
                       id="{{state.event.event_title}}" type="text">
            </div>
            <div>
                <label>Description</label>
                <input v-model="state.event.event_description"
                       id="{{state.event.event_description}}" type="text">
            </div>
            <div>
                <label>Lieu</label>
                <input v-model="state.event.event_place"
                       id="{{state.event.event_place}}" type="text">
            </div>
            <div>
                <label>Date</label>
                <input v-model="state.event.event_date"
                       id="{{state.event.event_date}}" type="datetime-local" @input = "checkStatus">
            </div>
            <button>Enregistrer</button>
        </form>
    </div>
        <div v-else>
            <h2>Titre : {{state.event.event_title}}</h2>
            <h3> Description : {{state.event.event_description}}</h3>
            <h3> Date de l'evenement : {{state.event.event_date}}</h3>
            <h3> Lieu de l'evenement : {{state.event.event_place}} </h3>
            <h3> Statut : {{state.event.event_status}} </h3>
            <h3>Evenement crée par : {{state.creator.firstname}}  {{state.creator.name}} </h3>
            <button @click="modeUpdateEvent">Modifier un évenement</button>
        </div>
            <div v-if="state.id !== 0">
                <Invitations :eventId="state.id"></Invitations>
            </div>
        <div>
            <Comments></Comments>
        </div>
        <div id="map"></div>
    </main>
</template>
<style scoped>

</style>