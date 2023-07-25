<template>
    <div> 
        <div class="modal-overlay" v-if="authStore.loginModal || authStore.registerModal"></div>
        <div class="modal" v-if="authStore.loginModal || authStore.registerModal">
            <div class="closingX" @click="closeModal">
                <h1>X</h1>
            </div>
            <div class="modal-content">
              <slot />

            </div>
        </div>
        
    </div>
    </template>

<script setup>
import { useAuthStore } from "~/store/auth";
const authStore = useAuthStore();
const closeModal = (e) => {
  authStore.setAuthModalLogin(false)
  authStore.setAuthModalRegister(false)


}
</script>

<style scoped>
input {
  height: 2rem;
  width: 70%;
}
.loginButton {
  margin-top: 2rem;
  width: 40%;
  height: 3rem;
  border-radius: 0.5rem;
  box-shadow: 3px 5px rgba(0, 0, 0, 0.2);
  font-size: 1.5rem;
}
h1 {
  margin-top: 0px;
}
.closingX {
  width: 90%;
  /* border: 2px solid red; */
  display: flex;
  justify-content: flex-end;
  padding: 0px;
}
.modal-overlay {
  position: fixed;
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
  width: 500px;
  background-color: #fff;
  border-radius: 16px;
  padding-right: 1rem;
  padding-left: 1rem;
  padding-top: 3rem;
  padding-bottom: 7rem;
}
.modal-content{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
</style>