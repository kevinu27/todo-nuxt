<template>
   <NuxtLink :to="`/task/${props.task._id}`" class="big-task"> 
    <div class="task" >
        <div class="closing"  ><span  @click="removeTask"> + </span></div>
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
            <div class="completition-bar"><div class="completition-bar-inner" :style="{ width: props.task.percentageOfCompletition }"></div> {{props.task.percentageOfCompletition   }}</div>
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
    console.log('--------- props.task.id', props.task._id)
    // tasksStore.removeTasksFromStorage(props.task.id)
    tasksStore.removeTasks(props.task._id)
}

// console.log('props', props.task._id)
</script>


<style scoped>
.big-task{
 
    text-decoration: none; 
    color: inherit;

}
.task {
    /* text-decoration: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #c2e7ef;
    margin-bottom: 1rem;
    border-radius: 3px;
    box-shadow: 5px 5px 5px rgba(30, 30, 30, 0.3);
    text-align: center; */
    /* border: 2px solid red; */
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
    /* width: 100%; */
    /* border: 2px solid red; */
    padding-left: 2rem;
    /* margin-left: 2rem; */
}
.task h1{
    margin: 0;
    margin-bottom: 1rem;
    /* margin-top: 1rem; */
    /* border: 2px solid red; */
    font-size: 36px;
    padding-left: 2rem;

}
.closing{
    /* width: 100%; */
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
    background-color: red;
    height: 10px;
    width: 70%;
    margin-left: 1rem;
    border-radius: 5px;
}
.completition-bar-inner{
    background-color: blue;
    /* width: 40%; */
    height: 100%;
    border-radius: 5px;


}
.completition-title{
    /* width: 30%; */
    
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
</style>