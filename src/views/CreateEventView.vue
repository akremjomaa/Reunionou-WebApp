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
            if(this.e.lieu !== '') {
                await axios.post(`http://api.reunionou.local:19080/events/`, {
                    event_title: this.e.titre,
                    event_description: this.e.descri,
                    event_place: this.e.lieu,
                    event_status: 'none',
                    created_by: this.e.id
                }).then(async () => {
                    await router.push(`/user/${e.id}/events`);
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
            if(this.e.adresse !== '') {
                await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${this.e.adresse}`).then(response => {
                    if(response.data.features[0]) {
                        this.e.lon = response.data.features[0].geometry.coordinates[0];
                        this.e.lat = response.data.features[0].geometry.coordinates[1];
                        this.e.lieu = `${this.e.lat},${this.e.lon}`;
                    } else {
                        alert("L'emplacement de l'évènement est inconnue !");
                    }

                }).catch(error => console.log(error));
            }

            if(this.e.lieu == '') {
                alert("L'emplacement de l'évènement est inconnue !");
            }

        }
    }
};

</script>

<template>
    <main>
        <div>
            <div><h1>Créer un évènement</h1></div>
            <form @submit.prevent="newEvent">
                <div>
                    <label>Titre</label>
                    <div>
                        <input class="input" required="required" v-model="e.titre" placeholder="Titre">
                    </div>
                </div>
                <div>
                    <label>Description</label>
                    <div>
                        <input class="input" required="required" v-model="e.descri" placeholder="Description">
                    </div>
                </div>
                <div>
                    <label>Lieu : </label>
                    <select v-on:change="onSelectChange">
                        <option value="">Veuillez choisir une option</option>
                        <option value="Carte">Carte</option>
                        <option value="Adresse">Adresse</option>
                    </select>
                    <div style="height:600px; width:800px" v-if="selected === 'Carte'">
                        <div style="height:500px; width:800px" id="map" ref="map"></div>
                    </div>
                    <div v-if="selected === 'Adresse'">
                        <label>Adresse de l'évènement</label>
                        <div>
                            <input class="input" type="text" v-model="e.adresse" placeholder="Adresse">
                        </div>

                    </div>
                </div>
                <div>
                    <label>Date</label>
                    <div>
                        <input class="input" type="date" required="required" v-model="e.date" placeholder="Titre">
                    </div>
                </div>
                <div v-if="loading === true">
                    Loading...
                </div>
                <button type="submit">Valider</button>
            </form>
        </div>
    </main>
</template>
<script setup>
</script>