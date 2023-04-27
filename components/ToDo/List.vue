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
console.log('tasksStore.tasks---s', tasksStore.tasks)

onMounted(() => {
    console.log("Component onMounted");
    tasks.value =  JSON.parse(localStorage.getItem("tasks"));

  })

  const removeTask = (taskId) => {
    console.log('taskId', taskId)
    console.log('tasksref', tasks.value)
    tasks.value = tasks.value.filter(task => task.id !== taskId)
    localStorage.setItem("tasks", JSON.stringify( tasks.value));
    console.log('filteredTasks', tasks.value)
  }

</script>

<style scoped>
.list{
    width: 100%;
}
</style>