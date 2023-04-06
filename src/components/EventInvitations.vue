<script setup>

import {useRoute} from "vue-router";
import {onMounted, reactive} from "vue";
import axios from "axios";
import {ref} from "@vue/reactivity";
import {BASE} from "../../public/config";
import {useUserStore} from "../stores/user";

const route = useRoute();
const usera = useUserStore();
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

function displayStatus(status){
    if (status === 'accepté'){
        return 'a accepté(e)'
    }
    else if (status === 'refusé'){
        return 'a refusé(e)'
    }
    else return 'en attente';
}

 function getCurrentDateTime() {
    const currentDate = new Date();
    state.currentDateTime = currentDate.toLocaleString();
}
async function getInvitations(){
    await axios.get(`${BASE}/events/${props.eventId}/invitations`).then(response =>{
        invitationList.value= response.data.invitations;
        count.value = response.data.count;
    })
}
async function getUsers(){
    await axios.get(`${BASE}/users`).then(response =>{
        state.users = response.data.users.filter(user => user.id !== usera.state.USER);
        usersList.value= state.users;
    })

}
function modeInviteMembers() {
    state.userListVisible = true;
}

async function sendInvitations(){
    const selectedUsersData = usersList.value.filter(user => state.selectedUsers.includes(user.id))
   await axios.post(`${BASE}/invitations`, {

                "invited" : [selectedUsersData[0].id],
                "event" : route.params.id

    })
        .then(response => {
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
               <div> <b> {{invitation.invited_name}} {{invitation.invited_firstName}}</b> {{displayStatus(invitation.invitation_status)}}</div>
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