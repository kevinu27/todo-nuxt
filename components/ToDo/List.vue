<template>
    <div class="list">
        <h1 @click="cargarLista">cargar lista</h1>
        <h1 @click="cargarLista2">cargar lista2</h1>
        <div class="task-container"
            v-for="task in tasksStore.tasks"
            :key="task._id"
        >
        <ToDoTask :task="task" @removeTask="removeTask"/>    
    </div>
       {{ tasksStore.tasks}}
    </div>
</template>

<script setup>
const tasks = ref()
import { useTodoStore } from '~/store/todo';
const tasksStore = useTodoStore()
// tasksStore.getTasks()
// tasks.value = tasksStore.getTasks()
const cargarLista = () => {



    tasksStore.setTasksFromStorage()
    const taskIds= tasksStore.tasks.map(taskId => taskId._id)
    console.log('taskIds---', tasksStore.tasks)
    // tasksStore.setSubtasks()
}
const cargarLista2 = () => {



const taskIds= tasksStore.tasks.map(taskId => taskId._id)
console.log('-------taskIds---', tasksStore.tasks)
console.log('-------taskIds---', taskIds)
tasksStore.setSubtasks(taskIds)
}


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