<template>
    <div>

        <div class="nav-bar" >
            <NuxtLink to="/" class="logo"><p>TO-DO List</p></NuxtLink> 
            <div class="right-buttons">
                <div class="menu-item" to="/auth" @click="authHandler">Login</div> 
                <NuxtLink class="menu-item" to="/auth">section</NuxtLink> 
                <!-- <a>df</a>
                    <a>df</a> -->
                </div>
            </div>
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
        <button class="loginButton">Signup</button>
    </AuthModal>
</div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore()
// const authModal = ref(false)


const authHandler = (e) => {
    console.log("login clicked")
    authStore.setAuthModal(true)
}
  const closeModal = (e) => {
    console.log("closing clicked")
    authStore.setAuthModal(false)

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
