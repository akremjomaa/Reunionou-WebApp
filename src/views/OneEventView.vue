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
    comments : [],
    status : '',
    eventFormVisible : false,
    currentDateTime : new Date(),


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

    await axios.get(`${BASE}/events/${route.params.id}?embed=invitations,comments`).then(response =>{
        console.log(response.data)
        state.event = response.data.event;
        state.id = response.data.event.id;
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
    <section class="column pt-6 is-10-tablet is-offset-1-tablet is-8-widescreen is-offset-2-widescreen">
        <div class="box" v-if="state.eventFormVisible">
            <form @submit.prevent="updateEvent">
                <div class="field">
                    <label class="label">Titre</label>
                    <input class="input" v-model="state.event.event_title" id="{{state.event.event_title}}" type="text">
                </div>
                <div class="field">
                    <label class="label">Description</label>

                    <input class="input" v-model="state.event.event_description" id="{{state.event.event_description}}" type="text">
                </div>
                <div class="field">
                    <label class="label">Lieu</label>
                    <input class="input" v-model="state.event.event_place" id="{{state.event.event_place}}" type="text">
                </div>
                <div class="field">
                    <label class="label">Date</label>

                    <input class="input"  v-model="state.event.event_date" id="{{state.date}}" type="text">
                </div>
                <button class="button is-link">
                    <span class="icon is-medium mr-2">
                        <i class="fas fa-save"></i>
                    </span>
                    Enregistrer
                </button>
            </form>
        </div>
        <div class="box" v-else>
            <h2 class="title is-2">{{ state.event.event_title }}</h2>
            <h3>Description : {{ state.event.event_description }}</h3>
            <h3>Date : {{ state.event.event_date }}</h3>
            <h3>Lieu : {{ state.event.event_place }} </h3>
            <h3>Statut : {{ state.event.event_status }} </h3>

            <button class="button is-link mt-3" @click="modeUpdateEvent">
                <span class="icon is-medium mr-2"><i class="fas fa-edit"></i></span>
                Modifier l'évènement
            </button>
        </div>

          <div v-if="state.id !== 0">
                <Invitations :eventId="state.id"></Invitations>
            </div>

            <Comments></Comments>

    </section>

</template>
<style scoped>

</style>