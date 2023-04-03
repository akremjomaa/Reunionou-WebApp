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
        handleMapClick(event) {

        },
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
                    <label>Lieu</label>
                    <div style="height:600px; width:800px">
                        <l-map ref="map" v-model:zoom="zoom" :center="[48.683188, 6.161877]" @click="handleMapClick">
                            <l-tile-layer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    layer-type="base"
                                    name="OpenStreetMap"
                            ></l-tile-layer>
                        </l-map>
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

<style scoped>
</style>