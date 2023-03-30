<script setup>

import {useRoute} from "vue-router";
import {onMounted} from "vue";
import axios from "axios";
import {ref} from "@vue/reactivity";

const route = useRoute();
const commentList = ref([]);
const count = ref(0);

onMounted(() => {
    console.log("Liste des commentaires d'un évenement");
    getInvitations()

});

async function getInvitations(){
    await axios.get(`https://api.reunionou.local:19043/events/${route.params.id}/comments`).then(response =>{
        console.log(response.data)
        commentList.value= response.data.comments;
        count.value = response.data.count;
        console.log(commentList.value)
        console.log(count.value)

    })
}

</script>

<template>
    <main>
        <div>
            <h2> List des commentaires : {{count}}</h2>
            <button>ajouter un commentaire</button>
            <template v-for="comment in commentList" :key="comment.id">

                <div v-if="comment.user_name === null"> {{comment.invited_name}} {{comment.invited_firstName}}</div>
                  <div v-else> {{comment.user_name}}</div>
                <div>contenu de commentaire : {{comment.content}}</div>
            </template>
        </div>
    </main>
</template>
<style scoped>

</style>