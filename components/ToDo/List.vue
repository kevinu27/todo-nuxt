<template>
    <div class="list">
        <h1 @click="cargarLista">cargar lista</h1>
        <h1 @click="cargarLista3">console del estado</h1>
        <div class="spinner-border" role="status" >
             <span class="sr-only">Loading...</span>
        </div>
        <button type="button" class="btn btn-primary">Primary</button>
        <div class="task-container"
        v-for="task in tasksStore.tasks"
        :key="task._id"
        >
        <!-- <span class="material-icons">face</span> -->
        <Transition name="fade">
            <ToDoTask :task="task" v-if="tasksStore.areTaskLoaded"/>    
        </Transition>

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
    var delayInMilliseconds = 1000; //1 second

setTimeout(function() {
  //your code to be executed after 1 second 
  tasksStore.areTaskLoaded = true
}, delayInMilliseconds);
   
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
.fade-enter-from{
    opacity:0;
}
.fade-enter-to{
    opacity: 1;
}
.fade-enter-active{
    transition: all 2s ease;
}
.fade-leave-from{}
.fade-leave-to{}
.fade-leave-active{}



</style>