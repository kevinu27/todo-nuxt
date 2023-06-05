<template>
    <div class="subtask">

        <div class="subtask-card">
            <div class="removingSubtask">
                <p @click="removingSubtask" >+</p>

            </div>
           <p>  {{props.subtask.subtaskDescription}} </p>
           <div class="checkbox-container">

               <div class="checkbox"> <label>  completed </label><input type="checkbox" class="checkbox-checkbox" v-model="completedSubtaskVmodel"> </div>
           </div>
        </div>
        {{completedSubtaskVmodel}}
    </div>
</template>

<script setup>
import { useTodoStore } from '~/store/todo';
const tasksStore = useTodoStore()
const completedSubtaskFromDatabase = props.subtask.subtaskStatus
const completedSubtaskVmodel = ref(completedSubtaskFromDatabase)
const props = defineProps({
  subtask: Object
})

const removingSubtask = () => {
    tasksStore.removeSubtask(props.subtask._id)
}

watch(completedSubtaskVmodel, async (newSubtask, oldSubtask) => {
    tasksStore.completeSubtasks(props.subtask._id, props.subtask.subtaskDescription, completedSubtaskVmodel.value)

})


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
margin-top: 0;
}
.subtask{
    margin-right: 2rem;
}
.checkbox{
    display: flex;
    width: 100%;
    /* border: 2px solid blue; */
    /* margin-left: 2rem; */
    align-items: center;
    justify-content: flex-end;
    margin-right: 15px;
    margin-bottom: 15px;
}
.checkbox-checkbox{
margin-left: 0px;
border: 2px solid red;
height: 15px;
width: 15px;
margin-left: 10px;
}

.removingSubtask{
/* border: 3px solid red; */
display: flex;
justify-content: flex-end;
}
.removingSubtask p{
margin: 0;
margin-top: 0.5rem;
margin-right: 0.5rem;
transform: rotate(-45deg);
}
.checkbox-container{
    display: flex;
    width: 100%;
    /* border: 2px solid red; */
    justify-content: flex-end;

}
label{
    margin:0;
}
</style>