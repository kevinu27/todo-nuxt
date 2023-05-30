<template>
    <div class="main">
        <section class="todo">
        <ToDoSearchBar/>
        <ToDoForm/>
        <ToDoList v-if="authStore.token"/>
    </section>
    </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore();
console.log('authStore.TOKENNNNNN', authStore.token)

</script>

<style>
.todo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    /* background-color: red; */

}
.main{
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background-color: green; */
    width: 100%;
}
</style>