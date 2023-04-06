<script>
import {useRoute} from "vue-router";
import {reactive} from "vue";
import axios from "axios";
import Invitations from '@/components/EventInvitations.vue'
import Comments from  '@/components/EventComments.vue'
import {BASE} from "../../public/config";
import "leaflet/dist/leaflet.css";
import {LMap, LMarker, LTileLayer} from "@vue-leaflet/vue-leaflet";
import L from "leaflet";
import {useUserStore} from "../stores/user";

const user =  useUserStore();

export default {
    name: "EventDetail",
    components: {
        Invitations,
        Comments,
        LMap,
        LTileLayer,
        LMarker,
    },
    data() {
        return {
            route: useRoute(),
            state: reactive({
                event: {},
                id: user.state.USER,
                invitations: [],
                comments: [],
                status: '',
                eventFormVisible: false,
                currentDateTime: new Date(),
                lat: '',
                lon: '',
                lieu: '',
                adresse: '',
            }),
            map: null,
            marker: null,
            loading: false,
        };
    },
    mounted() {
        this.getEvent();
        this.checkStatus();
    },
    methods: {
       async mapChange() {
            console.log(this.state.lat)
            console.log(this.state.lon)
            this.map = L.map('map').setView([parseFloat(this.state.lat), parseFloat(this.state.lon)], 16);
            this.marker = L.marker([parseFloat(this.state.lat),parseFloat(this.state.lon)]).addTo(this.map)
           L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
               attribution: 'Map data &copy; OpenStreetMap contributors'
           }).addTo(this.map);

           await axios.get(`https://api-adresse.data.gouv.fr/reverse/?lon=${this.state.lon}&lat=${this.state.lat}`).then(response => {
               if (response.data.features[0]) {
                   this.marker.bindPopup(`${response.data.features[0].properties.label}`).openPopup();
                   this.state.lieu = response.data.features[0].properties.label
               }
           }).catch(error => console.log(error));


            this.map.on('click', async event => {
                if (this.marker) {
                    this.marker.setLatLng(event.latlng);
                    this.state.lat = event.latlng.lat
                    this.state.lon = event.latlng.lng
                    this.state.lieu = `${this.state.lat},${this.state.lon}`
                    await axios.get(`https://api-adresse.data.gouv.fr/reverse/?lon=${this.state.lon}&lat=${this.state.lat}`).then(response => {
                        if (response.data.features[0]) {
                            this.marker.bindPopup(`${response.data.features[0].properties.label}`).openPopup();
                        }
                    }).catch(error => console.log(error));
                }
            });
        },
        //

        async getEvent() {
            await axios.get(`${BASE}/events/${this.route.params.id}/?embed=invitations,comments`).then(response => {
                console.log(response.data)
                this.state.event = response.data.event;
                this.state.id = response.data.event.id;
                this.state.invitations = response.data.event.invitations;
                this.state.comments = response.data.event.comments;
                [this.state.lat,this.state.lon] = this.state.event.event_place.split(',')
            }).then(async ()=>{
                await axios.get(`https://api-adresse.data.gouv.fr/reverse/?lon=${this.state.lon}&lat=${this.state.lat}`).then(response => {
                    if (response.data.features[0]) {
                        this.state.adresse = response.data.features[0].properties.label
                    }
                }).catch(error => console.log(error));
            }).then(async ()=>{
                await this.mapChange()
            })

        },
        checkStatus() {
            if (this.state.currentDateTime > this.state.event.event_date) {
                this.state.event.event_status = "déja passé"
            } else {
                this.state.event.event_status = "à venir"
            }
        },
        modeUpdateEvent() {
            this.state.eventFormVisible = true;
        },
        async updateEvent() {
            await axios.put(`${BASE}/events/${this.route.params.id}`, {
                event_title: this.state.event.event_title,
                event_description: this.state.event.event_description,
                event_place: this.state.event.event_place,
                event_date: this.state.event.event_date
            }).then(response => {
                console.log(response.data)
                this.state.eventFormVisible = false
            })
        },
    }
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
            <h3>Lieu : {{ state.adresse }} </h3>
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
        <div class="my-4 leaflet-reunionou" id="map" ref="map"></div>

    </section>

</template>
<style scoped>

</style>