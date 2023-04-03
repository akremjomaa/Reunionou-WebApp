<script setup>
import { onMounted } from '@vue/runtime-core';
import axios from "axios";
import {ref} from "@vue/reactivity";
import {BASE} from "../../public/config";

const eventsList = ref([]);
const count = ref(0);

onMounted(() => {

    console.log('list of évènements')
    getEvents()

})

async  function getEvents() {
    await axios.get(`${BASE}/users/2/events`).then(response =>{
        console.log(response.data)
        eventsList.value= response.data.events;
        count.value = response.data.count;
        console.log(eventsList.value)
        console.log(count.value)

    })
}


</script>
<template>
    <main>
        <h1>Vos Évènements : {{count}}</h1>
        <div>
            <template v-for=" oneEvent in eventsList" :key="oneEvent.id">
                <router-link :to="`/event/${oneEvent.id}`">
                    <div><h1>{{oneEvent.event_title}}</h1>
                        <h1>{{oneEvent.event_place}}  </h1>
                        <h1>{{oneEvent.event_date}}</h1>
                        <h1>{{oneEvent.event_status}}</h1>
                    </div></router-link>
                <hr>
            </template>

        </div>
    </main>
</template>