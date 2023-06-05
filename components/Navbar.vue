<template>
    <div>

        <div class="nav-bar" >
            <NuxtLink to="/" class="logo"><p>TO-DO List</p></NuxtLink> 
            <div class="right-buttons">
                <div class="menu-item" to="/auth" @click="loginModal" v-if="!authStore.token">Login</div> 
                <div class="menu-item" to="/auth" @click="logout" v-if="authStore.token">Logout</div> 
                <NuxtLink class="menu-item" to="/protected" v-if="authStore.token">section protected</NuxtLink> 
                <NuxtLink class="menu-item" v-if="authStore.token" @click="tokenConsole" >console del token</NuxtLink> 
                <!-- <span class="material-icons">face</span> -->
                
      
                <!-- <a>df</a>
                    <a>df</a> -->
                    
                </div>
            </div>
    <AuthModal v-if="authStore.loginModal">
        <h1>Login</h1>
        <h3>email</h3>
        <input type="email" v-model="email"/>
        <h3>password</h3>
        <input type="password" v-model="password"/>
        <div><p>Authenticating...</p></div>
        <br />
        <button class="loginButton" @click="loginHandler">Login</button>
        <div><p>not registered yet? <span class="register-link" @click="changeToRegister"> Register </span></p></div>
    </AuthModal>
    <AuthModal v-if="authStore.registerModal">
        <h1>Signup</h1>
        <h3>email</h3>
        <input type="email" v-model="email"/>
        <h3>password</h3>
        <input type="password" v-model="password"/>
        <!-- <div><p>Authenticating...</p></div> -->
        <br />
        <button class="loginButton" @click="registerHandler">Signup</button>
        <div><p>not registered yet? <span class="register-link" @click="changeToRegister"> Register </span></p></div>
    </AuthModal>
</div>
</template>

<script setup>
import { useTodoStore } from '~/store/todo';
const tasksStore = useTodoStore()



import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore()
import axios from 'axios'
const email = ref('');
const password = ref('');
const Router = useRouter();
const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true
});
// esto quizas ponerlo en app.vue
Router.beforeEach(async(to, from, next) => {
        if(authStore.token){
        return next()
        }
        if(to.fullPath === "/protected" || localStorage.getItem('user') === "true"){
           authStore.refreshToken()
           if(authStore.token){
                return next()
           }
           return next('/')
        }
})


const tokenConsole = () => {
    console.log("console del token es: ", authStore.token)

    
}
const loginModal = () => {
    authStore.setAuthModalLogin(true)
    authStore.setAuthModalRegister(false)    
}
  const closeModal = () => {
    authStore.setAuthModalLogin(false)
    authStore.setAuthModalRegister(false)


}
const changeToRegister = () => { 
authStore.setAuthModalRegister(true)
authStore.setAuthModalLogin(false)

}

const logout = (e) => { // 
    authStore.logout()
}


const registerHandler = () => { 
    authStore.registerHandler( email.value,  password.value)
    email.value = '';
    password.value = '';
    authStore.setAuthModalLogin(false)
  authStore.setAuthModalRegister(false)
}

const loginHandler = () => { // el async solo hace falta si usas el segundo metodo con el await, pero con el then no haria falta añadirle el async
    authStore.loginHandler( email.value,  password.value)
    email.value = '';
    password.value = '';
}


if (process.client) { // esto es para que no pete al comprobar localstorage
  if (typeof localStorage !== 'undefined') {
//   console.log('localStorage.getItem(user)------', typeof localStorage.getItem('user'))

    if(localStorage.getItem('user') === "true"){
    authStore.refreshToken()
}
  }
}

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

.register-link{
    color: blue
}
</style>>
