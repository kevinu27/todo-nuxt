import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', { //'todo' nombre del store
    state: () => ({
        authModal: false,
        token: ""
    }),

    actions: {
        async setAuthModal(showModal) {
            console.log('llamado al setAuthModal')
            this.authModal = showModal
        },
        async setAuthToken(token){
            console.log('el toke en el authstore: ', token)
            this.token = token
        }
    }

})