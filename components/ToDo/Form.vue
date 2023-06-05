<template>
    <div class="add-task-form">
        <form class="form2">
            <div class="input-line"> 
                <label>Task title</label>
                <input type="text" id="TaskTitle" name="task" placeholder="type a new task" class="input" v-model="taskName">
            </div>
            <div class="input-line"> 
                <label>deathline</label>
                <input type="date" id="deathline" name="task"  class="input" v-model="deathline">
            </div>
            <div class="input-line"> 
                <label>description</label>
                <input type="text" id="taskDescription" name="task" placeholder="type the description of the task" class="input" v-model="taskDescription">
            </div>
            <div class="input-line"> 
                <label>priority</label>
                <select v-model="priority" class="input">
                    <option value="">Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium </option>
                    <option value="Low">Low</option>
                </select>
            </div>
            <div class="input-line"> 
                <label>Category</label>
                <select v-model="category" class="input">
                    <option value="">Category</option>
                    <option value="daily">daily</option>
                    <option value="long term ">long term task goals</option>
                    <option value="short term">short term goals</option>
                    <option value="health">health</option>
                    <option value="skills">skills</option>
                </select>
            </div>
            <button class="button" @click="addTaskhandle">Add task</button>
        </form>
    </div>
</template>

<script setup>
import axios from 'axios'
import { useTodoStore } from '~/store/todo';
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore()
// esto de api de axios importartarlo desde otro archivo, quizas desde un composables
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true
});
const tasksStore = useTodoStore()
const taskName = ref('')
const deathline = ref('')
const taskDescription = ref('')
const priority = ref('')
const category = ref('')
const id = `${Date.now()}-${Math.random()}`
const addTaskhandle = async (e) => {
    e.preventDefault()
    tasksStore.addTask(taskName.value, deathline.value, taskDescription.value, priority.value, category.value, id)

}
</script>


<style scoped>
.button{
    background-color: #007bff;
    border: none;
    box-shadow: none;
    outline: none;
    font-size: 2rem;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    width: 20%;
    color: white;
}
.input{
    width: 80%;
    border-top-left-radius: 0rem;
  border-bottom-left-radius: 0rem;
}
input::placeholder {
    font-style: italic;
  font-size: 1.3rem;
  text-indent: 1rem;
}

.form2{
    /* border: 2px solid green; */
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 3px solid green; */

}
.add-task-form{
    width: 100%;
    /* border: 3px solid red; */
    border-radius: 1rem;
    background-color: #f0f0f0;
    padding: 3rem;
    /* padding-top: 4rem; */
    box-shadow: 5px 5px 5px rgba(30, 30, 30, 0.3);
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    margin-bottom: 3rem;

}
.input-line{
    width: 100%;
    /* border: 2px solid black; */
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}
label {
   margin-right: 2rem;
   font-size: 1.7rem;
   font-family: system-ui;
   width: 20%;
}

</style>