<script>

import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import axios from "axios";
import Invitations from "@/components/Invitations.vue";
import comments from "@/components/EventComments.vue"
import { BASE } from "../../public/config";
import { useUserStore } from "@/stores/user";
import EventComments from "@/components/EventComments.vue";

export default {
    components: {EventComments, Invitations},
    setup() {
        const route = useRoute();
        const user = useUserStore();
        const state = reactive({
            invitation: {},
            event: {},
            invited: {},
            comments: [],
            status: false,
            id: 0,
            currentDateTime: new Date(),
        });

        onMounted(() => {
            getInvitation();
            checkStatus();
        });

        async function getInvitation() {
            await axios
                .get(`${BASE}/invitations/${route.params.id}?embed=event,invited`)
                .then((response) => {
                    state.invitation = response.data.invitation;
                    state.id = response.data.invitation.event.id;
                    state.invited = response.data.invitation.invited;
                    state.event = response.data.invitation.event;
                    if (
                        state.invitation.status === "accepté" ||
                        state.invitation.status === "refusé"
                    ) {
                        user.invitationStatus = true;
                    } else {
                        user.invitationStatus = false;
                    }
                });
        }

        function checkStatus() {
            if (state.currentDateTime > state.event.date) {
                state.event.status = "déja passé";
            } else {
                state.event.status = "à venir";
            }
        }

        async function replyInvitation(newStatus) {
            await axios
                .put(`${BASE}/invitations/${route.params.id}`, {
                    status: newStatus,
                })
                .then((response) => {
                    console.log(response.data);
                    user.invitationStatus = true;
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        function accept() {
            replyInvitation("accepté");
        }

        function refuse() {
            replyInvitation("refusé");
        }

        return {
            state,
            accept,
            refuse,
            Invitations,
            comments,
            user,
        };
    },
};
</script>

<template>
    <section
        class="column pt-6 is-10-tablet is-offset-1-tablet is-8-widescreen is-offset-2-widescreen"
    >
        <h1 class="title is-2 has-text-centered">
            Mr/Ms <b>{{ state.invited.firstname }} {{ state.invited.name }}</b> vous
            êtes invités à cet évènement :
        </h1>
        <div>
            <h2>Titre : {{ state.event.title }}</h2>
            <h3> Description : {{ state.event.description }}</h3>
            <h3> Date de l'evenement : {{ state.event.date }}</h3>
            <h3> Lieu de l'evenement : {{ state.event.lieu }} </h3>
            <h3> Statut : {{ state.event.status }} </h3>
        </div>
        <div>
            <div v-if="state.id !== 0">
                <Invitations :idEvent="state.id"></Invitations>
            </div>
        </div>
        <div v-if="!user.invitationStatus">
            <p>Êtes-vous disponible pour cet événement ?</p>
            <button class="button is-link mr-2" @click="accept">Accepter</button>
            <button class="button is-primary is-outlined" @click="refuse">
                Refuser
            </button>
        </div>
        <div v-if="state.id !== 0">
            <EventComments :id="state.id"> </EventComments>
        </div>
    </section>
</template>
<style scoped>

</style>