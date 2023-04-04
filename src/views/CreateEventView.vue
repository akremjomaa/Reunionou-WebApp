<script>
import "leaflet/dist/leaflet.css";
import {LMap, LTileLayer, LMarker} from "@vue-leaflet/vue-leaflet";
import L from 'leaflet';
import axios from "axios";
import router from "../router";

export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
    },
    data() {
        return {
            map: null,
            marker: null,
            selected: '',
            loading: false,
            e: {
                id: 2,
                titre: '',
                descri: '',
                adresse: '',
                date: '',
                lieu: '',
                lat: '',
                lon: '',
            }
        }
    },
    methods: {
        onSelectChange(event) {
            this.selected = event.target.value;
            if (this.selected === 'Carte') {
                setTimeout(() => {
                    this.mapChange();
                }, 2000);
            }
        },
        mapChange() {
            this.map = L.map('map').setView([48.685054, 6.184417], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; OpenStreetMap contributors'
            }).addTo(this.map);

            this.map.on('click', event => {
                if (this.marker) {
                    this.marker.setLatLng(event.latlng);
                    this.e.lat = event.latlng.lat
                    this.e.lon = event.latlng.lng
                    this.e.lieu = `${this.e.lat},${this.e.lon}`
                    console.log(event.latlng);
                } else {
                    this.marker = L.marker(event.latlng).addTo(this.map);
                    this.e.lat = event.latlng.lat
                    this.e.lon = event.latlng.lng
                    this.e.lieu = `${this.e.lat},${this.e.lon}`
                    console.log(event.latlng);
                }
            });
        },
        async newEvent() {

            await this.getUser();
            await this.getPlace();

            if (this.e.lieu !== '') {
                await axios.post(`http://api.reunionou.local:19080/events/`, {
                    event_title: this.e.titre,
                    event_description: this.e.descri,
                    event_place: this.e.lieu,
                    event_status: 'none',
                    created_by: this.e.id
                }).then(async () => {
                    await router.push(`/user/${this.e.id}/events`);
                }).catch(error => console.log(error));
            }
        },
        async getUser() {
            this.loading = true;
            await axios.get(`http://api.reunionou.local:19080/users/2`).then(response => {
                console.log(response.data.user);
                // e.id = response.data.user.id;
            }).catch(error => console.log(error));
        },
        async getPlace() {
            if (this.e.adresse !== '') {
                await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${this.e.adresse}`).then(response => {
                    if (response.data.features[0]) {
                        this.e.lon = response.data.features[0].geometry.coordinates[0];
                        this.e.lat = response.data.features[0].geometry.coordinates[1];
                        this.e.lieu = `${this.e.lat},${this.e.lon}`;
                    } else {
                        alert("L'emplacement de l'évènement est inconnue !");
                    }

                }).catch(error => console.log(error));
            }

            if (this.e.lieu == '') {
                alert("L'emplacement de l'évènement est inconnue !");
            }

        }
    }
};

</script>

<template>
    <section class="column pt-6 is-10-tablet is-offset-1-tablet is-8-widescreen is-offset-2-widescreen">
        <h1 class="title is-2 has-text-centered">Créer un évènement</h1>
        <form @submit.prevent="newEvent">
            <div class="field">
                <label class="label">Titre</label>
                <div class="control">
                    <input class="input" required="required" placeholder="Votre titre">
                </div>
            </div>
            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <input class="input" required="required" placeholder="Votre description">
                </div>
            </div>
            <div class="field">
                <label class="label">Lieu</label>
                <select class="select control" v-on:change="onSelectChange">
                    <option value="">Veuillez choisir une option</option>
                    <option value="Carte">Carte</option>
                    <option value="Adresse">Adresse</option>
                </select>
                <div class="my-4 leaflet" v-if="selected === 'Carte'">
                    <div style="height:500px; width:800px" id="map" ref="map"></div>
                </div>
                <div v-if="selected === 'Adresse'">
                    <label class="label">Adresse de l'évènement</label>
                    <div>
                        <input class="input" type="text" v-model="e.adresse" placeholder="Adresse">
                    </div>

                </div>
            </div>
            <div class="field">
                <label class="label">Date</label>
                <div class="control">
                    <input class="input" type="date" required="required" placeholder="Titre">
                </div>
            </div>
            <div v-if="loading === true">
                Loading...
            </div>
            <div class="control is-flex is-justify-content-center mt-4">
                <button class="button is-link" type="submit">Valider</button>
            </div>
        </form>
    </section>
</template>
<script setup>
</script>