<template>
    <div class="task">
        <div class="closing" @click="removingTask"><p>+ </p></div>
        <h1>
            {{ props.task.taskName }}
        </h1>
        <p>
           Priority: {{ props.task.priority }}
        </p>
        <p>
            Deathline: {{ props.task.deathline }}
        </p>
    </div>
</template>


<script setup>
const props = defineProps({
  task: Object
})
const taskData = ref('')
onMounted(() => {

console.log('task', props.task)
taskData.value =  props.task

  })
    const removingTask = (e)=> {
        console.log('removing', taskData.value.id) 
    }
</script>


<style scoped>
.task {
    /* border: 3px solid red; */
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #c2e7ef;
    margin-bottom: 1rem;
    border-radius: 1rem;
}
.task p{
    margin: 0;
    margin-bottom: 1rem;
}
.task h1{
    margin: 0;
    margin-bottom: 1rem;
    margin-top: 1rem;
    font-size: 36px;
}
.closing{
    /* border: 2px solid red; */
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
.closing p {
    /* padding-top: 1rem; */
    font-size: 3rem;
    margin:0;
    padding:0;
    padding-right: 1rem;
    transform: rotate(-45deg);
}
</style>