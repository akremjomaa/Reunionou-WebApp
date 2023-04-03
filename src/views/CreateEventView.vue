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
    <main>
        <div>
            <div><h1>Créer un évènement</h1></div>
            <form action="">
                <div>
                    <label>Titre</label>
                    <div>
                        <input class="input" required="required" placeholder="Titre">
                    </div>
                </div>
                <div>
                    <label>Description</label>
                    <div>
                        <input class="input" required="required" placeholder="Description">
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
                            <input class="input" type="text" required="required" placeholder="Adresse">
                        </div>

                    </div>
                </div>
                <div>
                    <label>Date</label>
                    <div>
                        <input class="input" type="date" required="required" placeholder="Titre">
                    </div>
                </div>
                <button type="submit">Valider</button>
            </form>
        </div>
    </main>
</template>
<script setup>
</script>