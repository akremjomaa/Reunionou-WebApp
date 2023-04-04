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
    invitations : [],
    creator : {},
    comments : [],
    status : '',
    eventFormVisible : false,
    event_date_us: {}

})

onMounted(() => {
    console.log("one event view");
    getEvent()

});

async function getEvent(){

    await axios.get(`${BASE}/events/${route.params.id}?embed=invitations,user,comments`).then(response =>{
        console.log(response.data)
        state.event = response.data.event;
        state.creator = response.data.event.user;
        state.invitations = response.data.event.invitations;
        state.comments = response.data.event.comments;
    })
}
function modeUpdateEvent() {
    state.eventFormVisible = true;
}
async function updateEvent(){
    const isoDate = new Date(state.event.event_date).toISOString().slice(0, -1);
    await axios.put(`${BASE}/events/${route.params.id}`,{
        event_title : state.event.event_title,
        event_description :state.event.event_description,
        event_place : state.event.event_place,
        event_date : isoDate
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
                <div>
                    <label class="label">Titre</label>
                    <input v-model="state.event.event_title" id="{{state.event.event_title}}" type="text">
                </div>
                <div>
                    <label class="label">Description</label>
                    <input v-model="state.event.event_description" id="{{state.event.event_description}}" type="text">
                </div>
                <div>
                    <label class="label">Lieu</label>
                    <input v-model="state.event.event_place" id="{{state.event.event_place}}" type="text">
                </div>
                <div>
                    <label class="label">Date</label>
                    <input v-model="state.event.event_date" id="{{state.event.event_date}}" type="datetime-local">
                </div>
                <button class="button is-link">Enregistrer</button>
            </form>
        </div>
        <div class="box" v-else>
            <h2 class="title is-2">{{ state.event.event_title }}</h2>
            <h3>Description : {{ state.event.event_description }}</h3>
            <h3>Date : {{ state.event.event_date }}</h3>
            <h3>Lieu : {{ state.event.event_place }} </h3>
            <h3>Statut : {{ state.event.event_status }} </h3>
            <h3>Évènement créé par : {{ state.creator.firstname }} {{ state.creator.name }} </h3>
            <button class="button is-link mt-3" @click="modeUpdateEvent">Modifier un évenement</button>
        </div>

            <Invitations></Invitations>

            <Comments></Comments>

    </section>
</template>
<style scoped>

</style>