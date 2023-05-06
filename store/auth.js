import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', { //'todo' nombre del store
    state: () => ({
        authModal: false,
    }),

    actions: {
        async setAuthModal(showModal) {
            console.log('llamado al setAuthModal')
            this.authModal = showModal
        }
    }

})