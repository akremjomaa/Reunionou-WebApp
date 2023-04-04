<script setup>

import {useRoute} from "vue-router";
import {onMounted} from "vue";
import axios from "axios";
import {ref} from "@vue/reactivity";
import {BASE} from "../../public/config";

const route = useRoute();
const commentList = ref([]);
const count = ref(0);

onMounted(() => {
    console.log("Liste des commentaires d'un évenement");
    getComments()

});

async function getComments(){
    await axios.get(`${BASE}/events/${route.params.id}/comments`).then(response =>{
        console.log(response.data)
        commentList.value= response.data.comments;
        count.value = response.data.count;
        console.log(commentList.value)
        console.log(count.value)

    })
}

</script>

<template>
        <div class="box">
            <h2 class="subtitle is-4">Commentaires ({{count}})</h2>

            <button class="button is-link mb-3">
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
        </div>
</template>
<style scoped>

</style>