import { defineStore } from "pinia";
import { ref } from 'vue'
import axios from 'axios'


export const useAuthStore = defineStore('auth', { //'todo' nombre del store
    
    state: () => ({
        authModal: false,
        token: null,
        expiresIn:null
    }),

    actions: {
        async setAuthModal(showModal) {
            console.log('llamado al setAuthModal')
            this.authModal = showModal
        },
        async setAuthToken(token){
            console.log('el toke en el authstore: ', token)
            this.token = token
        },
        async loginHandler ( email,  password) { // el async solo hace falta si usas el segundo metodo con el await, pero con el then no haria falta añadirle el async
            console.log("login apretado")
            axios.post('http://localhost:5000/api/v1/login',     {
            email: email,
            password: password
            // email: "kevin2@prueba.com",
            // password: "123123"
            })
            .then(res => {
                console.log('res----', res)
                this.token = res.data.token
                this.setAuthToken(res.data.token)
                this.expiresIn = res.data.expiresIn
                this.setTime()
                localStorage.setItem('user', true)
                // const encodedCookie = encodeURIComponent(JSON.stringify(cookie));
                // document.cookie = `refreshToken=${encodedCookie}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/`;
                //poner una fecha de expiracion valida a la cookie, lo de los 15 minutos
                document.cookie = `refreshToken=${res.data.refresToken}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/;`;
        
            }).catch(e => console.log('errror', e))

        
        },
        
        // esto poerlo en otr pagina mas principal quizas
        
        
        async setTime() {
            setTimeout(()=> {
                refreshToken()
                // document.cookie = `refreshToken=${res.data.refresToken}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/`;
            }, this.expiresIn * 1000-6000) // * 1000-6000 es pasar a milisegundos y despues restarle 6 segundos
        
        },
        
       async refreshToken() {
            // esto del axis exportarlo de un helper o de un composable o lo que sea
            const api = axios.create({
            baseURL: 'http://localhost:5000/api/v1',
            withCredentials: true
            });
            try { 
                const res = await api.get('/refresh')
                console.log('refresh Token', res.data)
                this.token = res.data.token
                this.expiresIn = res.data.expiresIn
                // document.cookie = `refreshToken=${res.data.refresToken}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/`;
                console.log('la cookie----', res.data.refresToken)
                //  document.cookie = `refreshToken=${res.data.refresToken}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/; HttpOnly`;
                // document.cookie = `refreshToken=${res.data.refresToken}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/; HttpOnly; SameSite=strict; Secure`;
                localStorage.setItem('user', true)
                
                this.setTime()
            } catch (error) {
                console.log('refreshToken error', error)
                localStorage.setItem('user', false)

            }
        },
        async logout(){

            const api = axios.create({
            baseURL: 'http://localhost:5000/api/v1',
            withCredentials: true
            });

            try { 
                await api.get('/logout')
                console.log('logging out')
                localStorage.setItem('user', false)


            } catch(error) {
                console.log(error)
            }
            finally {
                this.token = null,
                this.expiresIn = null
            }
        },
    }

})