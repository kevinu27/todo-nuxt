<template>
    <div class="list">
        <div class="task-container"
            v-for="task in tasksStore.tasks"
            :key="task.id"
        >
        <ToDoTask :task="task" @removeTask="removeTask"/>    
    </div>
       
    </div>
</template>

<script setup>
const tasks = ref()
import { useTodoStore } from '~/store/todo';
const tasksStore = useTodoStore()
tasksStore.setTasksFromStorage()
// tasksStore.getTasks()
// tasks.value = tasksStore.getTasks()

onMounted(() => {
    console.log("Component onMounted");
    // tasks.value =  JSON.parse(localStorage.getItem("tasks"));
    console.log('tasksStore.tasks', tasksStore.tasks)
    tasks.value = tasksStore.tasks
  })

</script>

<style scoped>
.list{
    width: 100%;
}
</style>