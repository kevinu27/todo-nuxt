<template>
    <h1>ruta protegida, solo ejemplo</h1>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore()

console.log('authStore.tokenççççç', authStore.token)
if(!authStore.token){
    navigateTo('/')
}

</script>
