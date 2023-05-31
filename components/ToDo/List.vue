<template>
    <div class="list">
        <h1 @click="cargarLista">cargar lista</h1>
        <h1 @click="cargarLista3">console del estado</h1>
        <div class="task-container"
            v-for="task in tasksStore.tasks"
            :key="task._id"
        >
        <ToDoTask :task="task"/>    
    </div>
       <!-- {{ tasksStore.tasks}} -->
    </div>
</template>

<script setup>
const tasks = ref()
import { useTodoStore } from '~/store/todo';
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore()

const tasksStore = useTodoStore()
if(tasksStore.tasks.length === 0){ // para que no haga llamadas cuando cambio de pagina si ya hay task cargadas
    tasksStore.setTasksFromStorage()
}


const cargarLista3 = () => {
    console.log('this.task---!!!!!!++++', tasksStore.tasks )        
}

onMounted(() => {
    console.log("Component onMounted");
    // tasks.value =  JSON.parse(localStorage.getItem("tasks"));
    console.log('tasksStore.tasks', tasksStore.tasks)
    tasks.value = tasksStore.tasks
    if(authStore.token){
    }
    console.log('token', authStore.token)
  })

</script>

<style scoped>
.list{
    width: 100%;
}
</style>