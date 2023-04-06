<script setup>

import { onMounted, reactive} from "vue";
import axios from "axios";
import {ref} from "@vue/reactivity";
import {BASE} from "../../public/config";
const invitationList = ref([]);
const usersList = ref([]);
const count = ref(0);

const props = defineProps(['idEvent'])
let state = reactive({
    users : [],
})
onMounted(() => {

    getInvitations()
    getUsers()

});

async function getInvitations(){

    await axios.get(`${BASE}/events/${props.idEvent}/invitations`).then(response =>{
        invitationList.value= response.data.invitations;
        console.log(invitationList.value)
        count.value = response.data.count;
    })
}
async function getUsers(){
    await axios.get(`${BASE}/users`).then(response =>{
        state.users = response.data.users.filter(user => user.id !== 4);
        usersList.value= state.users;
    })

}

function displayStatus(status){
if (status === 'accepté'){
    return 'a accepté(e)'
}
else if (status === 'refusé'){
    return 'a refusé(e)'
}
else return 'en attente';
}
</script>

<template>
    <main>
        <div>
            <hr>
            <h2> List des invités : {{count}}</h2>
            <hr>

            <template v-for="invitation in invitationList" :key="invitation.id">
                <div> <b> {{invitation.invited_name}} {{invitation.invited_firstName}}</b> {{displayStatus(invitation.status)}}</div>
            </template>

        </div>
    </main>
</template>
<style scoped>

</style>