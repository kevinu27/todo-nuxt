<template>
    <div class="list">
        <!-- <h1 @click="cargarLista">cargar lista</h1>
        <h1 @click="cargarLista3">console del estado</h1> -->
        <div class="spin" v-if="!tasksStore.areTaskLoaded">
            <div class="spinner"></div>
        </div>
        <!-- <button type="button" class="btn btn-primary">Primary</button> -->
        <div class="task-container"
        v-for="task in tasksStore.filteredTasks"
        :key="task._id"
        >
        <!-- <span class="material-icons">face</span> -->
        <Transition name="fade">
            <ToDoTask :task="task" v-if="tasksStore.areTaskLoaded"/>    
        </Transition>

    </div>
       <!-- {{ tasksStore.tasks}} -->
       <removingTaskModal v-if="tasksStore.stagingRemoval">
 
    </removingTaskModal>
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


onMounted(() => {
    tasks.value = tasksStore.tasks
    if(authStore.token){
    }
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


.spin{
    display: flex;
    justify-content: center;

}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>