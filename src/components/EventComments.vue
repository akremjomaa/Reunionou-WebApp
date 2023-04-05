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
        <div class="box">
            <h2 class="subtitle is-4">Commentaires ({{count}})</h2>

            <button class="button is-link mb-3" @click="modeAddComment">
                <span class="icon is-medium mr-2"><i class="fas fa-comment"></i></span>
                Ajouter un commentaire
            </button>
            <template v-for="comment in commentList" :key="comment.id">
                <div class="my-3">
                    <h3 v-if="comment.user_name === null"><strong>{{comment.invited_name}} {{comment.invited_firstName}}</strong> a dit :</h3>
                    <h3 v-else><strong>{{comment.user_name}}</strong> a dit :</h3>
                    <p class="pl-3">{{comment.content}}</p>
                </div>

            </template>

            <div v-if="state.champCommentVisible">
                <form @submit.prevent="addComment">
                    <label for="text-input">Votre commentaire :</label>
                    <textarea v-model="state.comment.content" placeholder="Ajoutez votre commentaire ici"></textarea>
                    <button type="submit">Confirmer</button>
                </form>
            </div>
        </div>
</template>
<style scoped>

</style>