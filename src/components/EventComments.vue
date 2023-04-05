<script setup>

import {useRoute} from "vue-router";
import {inject, onMounted, reactive} from "vue";
import axios from "axios";
import {ref} from "@vue/reactivity";
import {BASE} from "../../public/config";

const route = useRoute();
const commentList = ref([]);
const count = ref(0);
const state = reactive({
    comment : {},
    champCommentVisible : false
})
onMounted(() => {
    getComments()

});

async function getComments(){
    await axios.get(`${BASE}/events/${route.params.id}/comments`).then(response =>{
        commentList.value= response.data.comments;
        count.value = response.data.count;


    })
}
async function addComment(){
    await axios.post(`${BASE}/comments`, {

        content : state.comment.content,
        event : parseInt(route.params.id),
        created_by : 1
    })
        .then(response => {
            alert(response.data.comment.content)
            state.champCommentVisible = false
            commentList.value = commentList.value.concat(response.data.comment)
        })
        .catch(error => {
            console.log(error)
        })
}
function modeAddComment() {
    state.champCommentVisible = true;
}


</script>

<template>
    <main>
        <div>
            <hr>
            <h2> List des commentaires : {{count}}</h2>
            <hr>

            <button @click="modeAddComment">ajouter un commentaire</button>
            <template v-for="comment in commentList" :key="comment.id">

                <div v-if="comment.user_name === null"> {{comment.invited_name}} {{comment.invited_firstName}}</div>
                  <div v-else> {{comment.user_name}}</div>
                <div>contenu de commentaire : {{comment.content}}</div>
            </template>

            <div v-if="state.champCommentVisible">
                <form @submit.prevent="addComment">
                    <label for="text-input">Votre commentaire :</label>
                    <textarea v-model="state.comment.content" placeholder="Ajoutez votre commentaire ici"></textarea>
                    <button type="submit">Confirmer</button>
                </form>
            </div>
        </div>
    </main>
</template>
<style scoped>

</style>