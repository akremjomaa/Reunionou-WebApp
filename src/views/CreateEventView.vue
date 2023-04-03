<script>
import "leaflet/dist/leaflet.css";
import {LMap, LTileLayer, LMarker} from "@vue-leaflet/vue-leaflet";
import L from 'leaflet';

export default {

    computed: {
    },
    components: {
        LMap,
        LTileLayer,
        LMarker,
    },
    data() {
        return {
            map: null,
            marker: null,
            selected: ''
        }
    },
    methods: {
        onSelectChange(event) {
            this.selected = event.target.value;
            if(this.selected === 'Carte') {
                setTimeout(() => {this.mapChange();}, 2000);
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
                    console.log(event.latlng);
                } else {
                    this.marker = L.marker(event.latlng).addTo(this.map);
                    console.log(event.latlng);
                }
            });
        }
    }
};

</script>

<template>
        <section class="column pt-6 is-10-tablet is-offset-1-tablet is-8-widescreen is-offset-2-widescreen">
            <h1 class="title is-2 has-text-centered">Créer un évènement</h1>
            <form action="" class="box">
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
                    <div class="my-4 leaflet-reunionou" v-if="selected === 'Carte'">
                        <div class="my-4 leaflet-reunionou" id="map" ref="map"></div>
                    </div>
                    <div v-if="selected === 'Adresse'">
                        <label class="label my-2">Adresse de l'évènement</label>
                        <div>
                            <input class="input" type="text" required="required" placeholder="Adresse">
                        </div>

                    </div>
                </div>
                <div class="field">
                    <label class="label">Date</label>
                    <div class="control">
                        <input class="input" type="date" required="required" placeholder="Titre">
                    </div>
                </div>
                <div class="control is-flex is-justify-content-center mt-4">
                    <button class="button is-link" type="submit">Valider</button>
                </div>
            </form>
        </section>
</template>
<script setup>
</script>