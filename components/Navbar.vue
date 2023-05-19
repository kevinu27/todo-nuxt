<template>
    <div>

        <div class="nav-bar" >
            <NuxtLink to="/" class="logo"><p>TO-DO List</p></NuxtLink> 
            <div class="right-buttons">
                <div class="menu-item" to="/auth" @click="authModal" v-if="!authStore.token">Login</div> 
                <div class="menu-item" to="/auth" @click="logout" v-if="authStore.token">Logout</div> 
                <NuxtLink class="menu-item" to="/protected" v-if="authStore.token">section protected</NuxtLink> 
      
                <!-- <a>df</a>
                    <a>df</a> -->
                    
                </div>
            </div>
            <p> 
                    {{ authStore.token }}
                </p>
    <AuthModal>
        <h1>Signup</h1>
        <h3>name</h3>
        <input type="text" />
        <h3>email</h3>
        <input type="email" />
        <h3>password</h3>
        <input type="password" />
        <div><p>Authenticating...</p></div>
        <br />
        <button class="loginButton" @click="loginHandler">Signup</button>
    </AuthModal>
</div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';
import axios from 'axios'
const Router = useRouter();
// import api from '.nuxt/boot/axios.js'
const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true
});

Router.beforeEach((to, from, next) => {
    console.log('to', to)
    next()
})

const authStore = useAuthStore()
// const authModal = ref(false)
const token = ref('')
const expiresIn = ref ('')

const authModal = (e) => {
    console.log("login clicked")
    authStore.setAuthModal(true)
}
  const closeModal = (e) => {
    console.log("closing clicked")
    authStore.setAuthModal(false)

}

const logout = (e) => { // 
    authStore.logout()
}

const loginHandler = (e) => { // el async solo hace falta si usas el segundo metodo con el await, pero con el then no haria falta añadirle el async
//     e.preventDefault
    console.log("login apretado")
    authStore.loginHandler()
//     axios.post('http://localhost:5000/api/v1/login',     {
//     email: "kevin2@prueba.com",
//     password: "123123"
//     })
//     .then(res => {
//         console.log('res----', res)
//         token.value = res.data.token
//         authStore.setAuthToken(res.data.token)
//         expiresIn.value = res.data.expiresIn
//         setTime()
//         // const encodedCookie = encodeURIComponent(JSON.stringify(cookie));
//         // document.cookie = `refreshToken=${encodedCookie}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/`;
//         //poner una fecha de expiracion valida a la cookie, lo de los 15 minutos
//         document.cookie = `refreshToken=${res.data.refresToken}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/`;


//     }).catch(e => console.log(e))
//     // lo mismo pero haciendo con el try and catch y el async await
//     // try {
//     //    const res = await axios.post('http://localhost:5000/api/v1/login', {
//     //         email: "kevin2@prueba.com",
//     //         password: "123123"
//     //     })
//     //     console.log('res----', res.data)
//     // } catch(error) {
//     //     console.log(error)
  
//     // }



//     // https://universal-backend.onrender.com/api/v1/login
// //     {
// //     "email": "kevin2@prueba.com",
// //     "password": "123123"
// // }

}

// // esto poerlo en otr pagina mas principal quizas


// const setTime = () => {
//     setTimeout(()=> {
//         refreshToken()
//         // document.cookie = `refreshToken=${res.data.refresToken}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/`;
//     }, expiresIn.value * 1000-6000) // * 1000-6000 es pasar a milisegundos y despues restarle 6 segundos

// }

// const refreshToken = async() => {
//     try { 
//         const res = await api.get('/refresh')
//         console.log('refresh Token', res.data)
//         token.value = res.data.token
//         expiresIn.value = res.data.expiresIn
//         // document.cookie = `refreshToken=${res.data.refresToken}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/`;
//         console.log('la cookie----', res.data.refresToken)
//         document.cookie = `refreshToken=${res.data.refresToken}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/`;
//         // document.cookie = `refreshToken=${res.data.refresToken}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/; HttpOnly; SameSite=strict; Secure`;

//         setTime()
//     } catch (error) {
//         console.log('refreshToken error', error)
//     }
// }
authStore.refreshToken()
</script>

<style scoped>
.nav-bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
    height: 4rem;
    padding: 0.5rem 1rem;
    font-size: 30px;
    font-weight: 700;
    font-family: system-ui;
    width: auto;
    margin: 0;
    margin-bottom: 5rem;
    /* padding: 0; */

}
.menu-item{
    font-size: 20px;
    font-weight: 400;
    text-decoration: none;
    color: inherit;
    margin-right: 0.5rem;
    margin-right: 1rem;
}
.logo{
    text-decoration: none;
    color: inherit
}
.right-buttons{
    display: flex;
}
</style>>
