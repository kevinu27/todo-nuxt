<template>
    <section class="todo">

        <ToDoSearchBar>
        </ToDoSearchBar>
        <!-- <ToDoList v-if="hasStateChanged">
        </ToDoList> -->
        <ToDoForm>
        </ToDoForm>
    </section>
</template>



<!-- <script setup>
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore()

return {
      hasStateChanged: authStore.hasTokenChanged,
    };
</script> -->