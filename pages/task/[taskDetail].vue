<template>
    <div>

        <h1>Task Detail</h1>
        {{ taskDetails.taskName }}
    </div>

</template>

<script setup>
import { useTodoStore } from '~/store/todo';
// import { useAuthStore } from '~/store/auth';
import { useRoute } from 'vue-router'
const route = useRoute()
    // Access the route parameters
    console.log('-----params',route.params.taskDetail)
const tasksStore = useTodoStore()
console.log('-----ptasks del taskstore', tasksStore.tasks)

const taskDetails = tasksStore.tasks.find(task => task._id === route.params.taskDetail)
console.log('-----taskDetails', taskDetails.taskName)



</script>