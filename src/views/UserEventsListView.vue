<script setup>
import { onMounted } from '@vue/runtime-core';
import axios from "axios";
import {ref} from "@vue/reactivity";
import {BASE} from "../../public/config";
import {useUserStore} from "../stores/user";

const eventsList = ref([]);
const count = ref(0);
const user = useUserStore();

onMounted(() => {

    console.log('list of évènements')
    getEvents()

})

async  function getEvents() {

    await axios.get(`${BASE}/users/${user.state.USER}/events`).then(response =>{
        eventsList.value= response.data.events;
        count.value = response.data.count;


    })
}


</script>
<template>
    <section class="column pt-6 is-10-tablet is-offset-1-tablet is-8-widescreen is-offset-2-widescreen">
        <h1 class="title is-2 has-text-centered">Vos évènements ({{count}})</h1>
        <div>
            <template v-for=" oneEvent in eventsList" :key="oneEvent.id">
                <router-link :to="`/event/${oneEvent.id}`">
                    <div class="box">
                        <h2>{{oneEvent.event_title}}</h2>
                        <h3>{{oneEvent.event_place}}</h3>
                        <h3>{{oneEvent.event_date}}</h3>
                        <h3>{{oneEvent.event_status}}</h3>
                    </div>
                </router-link>
            </template>

        </div>
    </section>
</template>