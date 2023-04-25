<template>
    <div class="list">
        <div class="task-container"
            v-for="task in tasks"
            :key="task.id"
        >
        <ToDoTask :task="task"/>    
    </div>
       
    </div>
</template>

<script setup>
const tasks = ref()

onMounted(() => {
    console.log("Component onMounted");
    tasks.value =  JSON.parse(localStorage.getItem("tasks"));
    // console.log(tasks.value) 

  })

</script>

<style scoped>
.list{
    width: 100%;
}
</style>