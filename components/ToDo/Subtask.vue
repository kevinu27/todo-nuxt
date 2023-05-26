<template>
    <div class="subtask">

        <div class="subtask-card">
           <p>  {{props.subtask.subtaskDescription}} </p>
           <div class="checkbox"> <label>  completed </label><input type="checkbox" v-model="completedSubtask"> </div>
        </div>
        {{completedSubtask}}
    </div>
</template>

<script setup>
import { useTodoStore } from '~/store/todo';
const tasksStore = useTodoStore()
const completedSubtask = ref(false)
const props = defineProps({
  subtask: Object
})
console.log(props)
</script>

<style scoped>
.subtask-card{
    width: 100%;
    border: 2px solid black;
    margin-right: 2rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    background-color: rgb(188, 229, 160);
}
.subtask-card p {
white-space: nowrap;
}
.subtask{
    margin-right: 2rem;
}
.checkbox{
    display: flex;
    width: fit-content;
    /* border: 2px solid blue; */
    margin-left: 2rem;
    align-items: center;

}
</style>