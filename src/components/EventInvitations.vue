<script setup>

import {useRoute} from "vue-router";
import {onMounted, reactive} from "vue";
import axios from "axios";
import {ref} from "@vue/reactivity";
import {BASE} from "../../public/config";

const route = useRoute();
const invitationList = ref([]);
const usersList = ref([]);
const count = ref(0);

const props = defineProps(['eventId'])
let state = reactive({
    userListVisible: false,
    users : [],
    currentDateTime :'',
    selectedUsers : []
})
onMounted(() => {
    getInvitations()
    getUsers()
    getCurrentDateTime()

});

 function getCurrentDateTime() {
    const currentDate = new Date();
    state.currentDateTime = currentDate.toLocaleString();
}
async function getInvitations(){
     console.log(props.eventId)
    await axios.get(`${BASE}/events/${props.eventId}/invitations`).then(response =>{
        invitationList.value= response.data.invitations;
        count.value = response.data.count;
    })
}
async function getUsers(){
    await axios.get(`${BASE}/users`).then(response =>{
        state.users = response.data.users.filter(user => user.id !== 2);
        usersList.value= state.users;
    })

}
function modeInviteMembers() {
    state.userListVisible = true;
}

async function sendInvitations(){
    const selectedUsersData = usersList.value.filter(user => state.selectedUsers.includes(user.id))
console.log(state.currentDateTime)
    console.log(selectedUsersData[0].id)
    console.log(route.params.id)
   await axios.post(`${BASE}/invitations`, {

                "invited" : [selectedUsersData[0].id],
                "event" : route.params.id

    })
        .then(response => {
            console.log(response.data)
            state.userListVisible = false
        })
        .catch(error => {
            console.log(error)
        })
}

</script>

<template>
        <div class="box">
            <h2 class="subtitle is-4"> Liste des invités ({{count}})</h2>

            <template v-for="invitation in invitationList" :key="invitation.id">
               <div> <b> {{invitation.invited_name}} {{invitation.invited_firstName}}</b> {{invitation.invitation_status}}</div>
            </template>
             <button class="button is-link mt-3" @click="modeInviteMembers">
                 <span class="icon is-medium mr-2"><i class="fas fa-user-plus"></i></span>
                 Inviter des membres
             </button>

            <div v-if="state.userListVisible">
                <form>
                    <template v-for="user in usersList" :key="user.id">
                        <label>
                            <input type="checkbox" :value="user.id" v-model="state.selectedUsers">
                            {{ user.firstname }} {{user.lastname}}
                        </label><br>
                    </template>
                    <button class="button is-link mt-3" @click.prevent="sendInvitations">
                        <span class="icon is-medium mr-2"><i class="fas fa-paper-plane"></i></span>
                        Envoyer
                    </button>
                </form>

            </div>

        </div>
</template>
<style scoped>

</style>