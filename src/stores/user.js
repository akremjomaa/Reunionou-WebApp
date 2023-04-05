import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useUserStore = defineStore('user', () => {
    const invitationStatus = ref(false);

    /*function accepted() {
        invitationStatus.value = 'accepté';
    }
    function refused() {
        invitationStatus.value = 'refusé';
    }*/
    return { invitationStatus }
}, {
    persist: true,
})
