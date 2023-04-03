<script>

import "leaflet/dist/leaflet.css";
import {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LControlLayers,
    LTooltip,
    LPopup,
    LPolyline,
    LPolygon,
    LRectangle,
} from "@vue-leaflet/vue-leaflet";

export default {
    components: {
        LMap,
        LIcon,
        LTileLayer,
        LMarker,
        LControlLayers,
        LTooltip,
        LPopup,
        LPolyline,
        LPolygon,
        LRectangle,
    },
    data() {
        return {
            zoom: 14,
            iconWidth: 25,
            iconHeight: 40,
            selected: ""
        };
    },
    computed: {
        iconUrl() {
            return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`;
        },
        iconSize() {
            return [this.iconWidth, this.iconHeight];
        },
    },
    methods: {
        changeIcon() {
            this.iconWidth += 2;
            if (this.iconWidth > this.iconHeight) {
                this.iconWidth = Math.floor(this.iconHeight / 2);
            }
        },
        onSelectChange(event) {
            this.selected = event.target.value;
        },
        onMapClick(event) {
            const lat = event.originalEvent.latlng.lat;
            const lng = event.originalEvent.latlng.lng;
            console.log(`Map clicked at: (${lat}, ${lng})`);
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
                    <div class="my-4 leaflet" v-if="selected === 'Carte'">
                        <l-map :use-global-leaflet="false" ref="map" v-model:zoom="zoom" :center="[48.683188, 6.161877]" @click="onMapClick">
                            <l-tile-layer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    layer-type="base"
                                    name="OpenStreetMap"
                            ></l-tile-layer>
                        </l-map>
                    </div>
                    <div v-if="selected === 'Adresse'">
                        <label class="label">Adresse de l'évènement</label>
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

<style scoped>
</style>