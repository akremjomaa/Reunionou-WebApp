import { reactive } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useUserStore = defineStore('user', () => {
 const invitationStatus = ref(false);
    const state = reactive({
        TOKEN: '',
        USER: ''
    });

    const router = useRouter();

    function connexion() {
        router.push('/connexion');
    }

    function sedeconnecter() {
        state.TOKEN = '';
        state.USER = '';
        router.push('/connexion');
    }

    return {state, connexion, sedeconnecter,invitationStatus};
}, {
    persist: true,
})
