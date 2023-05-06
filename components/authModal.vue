<template>
    <div> 

        <div class="modal-overlay" v-if="authStore.authModal"></div>
        <div class="modal" v-if="authStore.authModal">
            <div class="closingX" @click="closeModal">
                <h1>X</h1>
            </div>
            <slot />
            <!-- <h1>Signup</h1>
            <h3>name</h3>
            <input type="text" />
            <h3>email</h3>
            <input type="email" />
            <h3>password</h3>
            <input type="password" />
            <div><p>Authenticating...</p></div>
            <br />
            <button class="loginButton">Signup</button> -->
        </div>
        
    </div>
    </template>

<script setup>
import { useAuthStore } from "~/store/auth";
const authStore = useAuthStore();
const closeModal = (e) => {
  console.log("closing clicked")
  authStore.setAuthModal(false)


}
</script>

<style>
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 16px;
  padding-right: 1rem;
  padding-left: 1rem;
  padding-top: 3rem;
  padding-bottom: 7rem;
}
</style>