<script>
import "leaflet/dist/leaflet.css";
import {LMap, LTileLayer, LMarker} from "@vue-leaflet/vue-leaflet";
import L from 'leaflet';
import axios from "axios";
import router from "../router";
import {useUserStore} from "../stores/user";

const user = useUserStore();

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
                id: user.state.USER,
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

            this.map.on('click', async event => {
                if (this.marker) {
                    this.marker.setLatLng(event.latlng);
                    this.e.lat = event.latlng.lat
                    this.e.lon = event.latlng.lng
                    this.e.lieu = `${this.e.lat},${this.e.lon}`
                    await axios.get(`https://api-adresse.data.gouv.fr/reverse/?lon=${this.e.lon}&lat=${this.e.lat}`).then(response => {
                        if (response.data.features[0]) {
                            this.marker.bindPopup(`${response.data.features[0].properties.label}`).openPopup();
                        }
                    }).catch(error => console.log(error));
                } else {
                    this.marker = L.marker(event.latlng).addTo(this.map);
                    this.e.lat = event.latlng.lat
                    this.e.lon = event.latlng.lng
                    this.e.lieu = `${this.e.lat},${this.e.lon}`
                    await axios.get(`https://api-adresse.data.gouv.fr/reverse/?lon=${this.e.lon}&lat=${this.e.lat}`).then(response => {
                        if (response.data.features[0]) {
                            this.marker.bindPopup(`${response.data.features[0].properties.label}`).openPopup();
                        }
                    }).catch(error => console.log(error));
                }
            });
        },
        async newEvent() {
            await this.getPlace();

            if (this.e.lieu !== '') {
                await axios.post(`http://api.reunionou.local:19080/events/`, {
                    event_title: this.e.titre,
                    event_description: this.e.descri,
                    event_place: this.e.lieu,
                    event_status: 'none',
                    event_date: this.e.date,
                    created_by: this.e.id
                }).then(() => {
                    router.push(`/user/${this.e.id}/events`);
                }).catch(error => console.log(error));
            }
        },
        async getPlace() {
            this.loading = true;
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
        <form class="box" @submit.prevent="newEvent">
            <div class="field">
                <label class="label">Titre</label>
                <div class="control">
                    <input class="input" required="required" v-model="e.titre" placeholder="Votre titre">
                </div>
            </div>
            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <input class="input" required="required" v-model="e.descri" placeholder="Votre description">
                </div>
            </div>
            <div class="field">
                <label class="label">Lieu</label>
                <select class="select control" v-on:change="onSelectChange">
                    <option value="">Veuillez choisir une option</option>
                    <option value="Carte">Carte</option>
                    <option value="Adresse">Adresse</option>
                </select>
                <div class="my-4 leaflet-reunionou" v-if="selected === 'Carte'">
                    <div class="my-4 leaflet-reunionou" id="map" ref="map"></div>
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
                    <input class="input" type="datetime-local" required="required" v-model="e.date">
                </div>
            </div>
            <div v-if="loading === true" class="control is-flex is-justify-content-center mt-4">
                <button class="button is-info is-loading">Loading</button>
            </div>
            <div v-if="loading === false" class="control is-flex is-justify-content-center mt-4">
                <button class="button is-link" type="submit">
                    <span class="icon is-medium mr-2">
                      <i class="fas fa-save"></i>
                    </span>
                    Enregistrer
                </button>
            </div>
        </form>
    </section>
</template>
<script setup>
</script>