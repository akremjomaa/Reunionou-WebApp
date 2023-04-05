<script setup>

import {useRoute} from "vue-router";
import {onMounted, reactive} from "vue";
import axios from "axios";
import {ref} from "@vue/reactivity";
import {BASE} from "../../public/config";

const invitationList = ref([]);
const usersList = ref([]);
const count = ref(0);

const props = defineProps(['eventId'])
let state = reactive({
    users : [],
})
onMounted(() => {
    console.log(props)
    getInvitations()
    getUsers()

});
async function getInvitations(){
    console.log(props.eventId)
    await axios.get(`${BASE}/events/${props.eventId}/invitations`).then(response =>{
        invitationList.value= response.data.invitations;
        count.value = response.data.count;
    })
}
async function getUsers(){
    await axios.get(`${BASE}/users`).then(response =>{
        state.users = response.data.users.filter(user => user.id !== 4);
        usersList.value= state.users;
    })

}
</script>

<template>
    <main>
        <div>
            <hr>
            <h2> List des invités : {{count}}</h2>
            <hr>

            <template v-for="invitation in invitationList" :key="invitation.id">
                <div> <b> {{invitation.invited_name}} {{invitation.invited_firstName}}</b> {{invitation.invitation_status}}</div>
            </template>

        </div>
    </main>
</template>
<style scoped>

</style>