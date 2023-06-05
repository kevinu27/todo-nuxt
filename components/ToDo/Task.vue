<template>
   <NuxtLink :to="`/task/${props.task._id}`" class="big-task"> 
    <div class="task" >
        <div class="closing"  ><span @click.prevent.stop="removeTask"> + </span></div>
        <h1>
            {{ props.task.taskName }}
        </h1>
        <p>
           Priority: {{ props.task.priority }}
        </p>
        <p>
            Deathline: {{ props.task.deathline }}
        </p>
        <p>
            Category: {{ props.task.category }}
        </p>  

        <div class="completition">
            <span class="completition-title">
                completition: 
            </span>
            <div class="completition-bar">
                <div class="completition-bar-inner" :style="{ width: props.task.percentageOfCompletition }">
                </div> 
                <span class="completetion-percentage"> {{percentageOfCompletition}} 
                </span>
            </div>
        </div>
    </div>
</NuxtLink >
</template>


<script setup>
import { useTodoStore } from '~/store/todo';

const tasksStore = useTodoStore()

const props = defineProps({
  task: Object
})
const taskData = ref('')

onMounted(() => {
taskData.value =  props.task
})

const removeTask = () => {
    tasksStore.removeTasks(props.task._id)
}


const percentageOfCompletition = computed(() => {
  if(props.task.percentageOfCompletition.substring(0, 1) == 0 ){
    console.log('if props.task.percentageOfCompletition.substring(0, 1)', props.task.percentageOfCompletition.substring(0, 1))
   return props.task.percentageOfCompletition.substring(0, 2)
  }else {
    console.log('else props.task.percentageOfCompletition.substring(0, 1)', props.task.percentageOfCompletition.substring(0, 1))

    return props.task.percentageOfCompletition.substring(0, 2) + '%'
  }
})
</script>


<style scoped>
.big-task{
    text-decoration: none; 
    color: inherit;
}
.task {
    margin-bottom: 1rem;
    border-radius: 3px;
    box-shadow: 5px 5px 5px rgba(30, 30, 30, 0.3);
    width: 100%;
    background-color: #c2e7ef;
    display: flex;
    flex-direction: column;
    justify-content: center;

}
.task p{
    margin: 0;
    margin-bottom: 1rem;
    padding-left: 2rem;
}
.task h1{
    margin: 0;
    margin-bottom: 1rem;
    font-size: 36px;
    padding-left: 2rem;

}
.closing{
    display: flex;
    justify-content: flex-end;
}
.closing span {
    font-size: 3rem;
    margin:0;
    padding:0;
    padding-right: 1rem;
    transform: rotate(-45deg);
}
.completition-bar{
    /* background-color: red;
    height: 5px;
    width:40%;
    margin-bottom: 1rem; */
    background-color:rgb(96, 96, 129);
    height: 10px;
    width: 70%;
    margin-left: 1rem;
    border-radius: 5px;
}
.completition-bar-inner{
    background-color:rgb(0, 0, 128);
    /* width: 40%; */
    height: 100%;
    border-radius: 5px;


}

.completition{
    /* display: flex;
    width: 100%;
    justify-content: flex-start; */
    padding-left: 2rem;
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
}
.completetion-percentage{

}
</style>