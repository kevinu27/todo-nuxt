<template>
    <div class="taskDetail">

        <div class="taskDetailCard">
            <div v-if="!tasksStore.editTaskModal">
                <div>
                    {{ taskDetails.taskName }}
                </div>
                    
                <div>
                    {{ taskDetails.taskDescription }}
                </div>
                <div>
                    {{ taskDetails.priority}}
                </div>
            </div>
            <div v-if="tasksStore.editTaskModal">
                    <ToDoEditForm :taskDetails="taskDetails"/>
            </div>

        <div class="subtasks">
            <h2>Subtasks</h2>
            <div><button class="add-subtask" @click="showSubtaskForm"> +</button></div>
            <div class="closing-subtask-form"><span class="closingX" v-if="subtasksForm" @click="closeSubtaskForm"> +</span></div>
            <form class="form" v-if="subtasksForm">
 
            <div class="input-line"> 
                <label class="label-class">description</label>
                <input type="text" id="fname" name="task" placeholder="type the description of the task" class="" v-model="subtaskDescription">
            </div>

            <button class="button" @click="addsubTaskhandle">Add subtask</button>
            </form>
        
            <div class="subtasks-card">
                <div  v-for="subtask in tasksStore.tasks.find(task => task._id === route.params.taskDetail).subtasks" :key="subtask._id">
                    <ToDoSubtask :subtask="subtask"/>
                </div>
            </div>   
            </div>
            <div class="card-footer">
                <div><button class="edit"  @click="editTaskhandle"> editar</button></div>
            <div><button class="remove"  @click="removeTaskhandle"> remove</button></div>
            <div class="checkbox"> <label> Mark task as completed </label><input type="checkbox" v-model="taskCompleted" :checked="true"> </div>
            
        </div>
        <!-- <div> taskCompletedFromTaskDetail - {{taskCompletedFromTaskDetail }}</div>  -->
    </div>
    </div>

</template>

<script setup>
import { useTodoStore } from '~/store/todo';
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore()
const tasksStore = useTodoStore()
import { useRouter } from 'vue-router'
const router = useRouter()
// import { useAuthStore } from '~/store/auth';
// import { useRouter } from 'vue-router'
// const router = useRouter()
const subtasksForm = ref(false)
const subtaskDescription = ref('')
let taskcompleted = false
const taskCompleted = ref('')
console.log('taskDetail----prueba')


if(tasksStore.tasks.length === 0 || !authStore.token){
    console.log('estoy intentado hacer rouert push')
    router.replace('/')
    // router.push('/')
}
// const Router = useRouter();
// Router.beforeEach(async(to, next) => {
//     console.log('to----------', to.fullPath)
//     return next('/')
//         // if(authStore.token){
//         // return next()
//         // }
//         // if(to.fullPath === "/protected" || localStorage.getItem('user') === "true"){
//         //    authStore.refreshToken()
//         //    if(authStore.token){
//         //         return next()
//         //    }
//         //    return next('/')
//         // }

// })



watch(taskCompleted, async (newTask, oldTask) => {
    console.log('newTask', newTask)
    console.log('oldTask', oldTask)
    if(oldTask){
        taskcompleted = false
    }else {
        taskcompleted = true
    }
    console.log('taskDetails', taskDetails )
    console.log('tasksStore.tasks', tasksStore.tasks )
    console.log(' taskDetails.taskStatus****** ', taskDetails.taskStatus  )
    tasksStore.completeTasks(taskDetails._id, taskDetails.taskName, taskDetails.deathline, taskDetails.taskDescription, taskDetails.priority, taskDetails.category, taskDetails.taskStatus, taskcompleted)
})

const route = useRoute()
const taskDetails = tasksStore.tasks.find(task => task._id === route.params.taskDetail)
const taskCompletedFromTaskDetail = taskDetails.taskcompleted
if(taskDetails.taskcompleted){
    taskCompleted.value = true
}else {
    taskCompleted.value = false
} 
console.log('taskCompletedFromTaskDetail', taskCompletedFromTaskDetail)

console.log(' taskDetails****** ', taskDetails)

console.log('------------',taskDetails.taskStatus)
console.log('------------',taskDetails)
const showSubtaskForm = () => {
    subtasksForm.value = true
}
tasksStore.currentTask = taskDetails


const editTaskhandle = () => {
console.log('edit task')
    tasksStore.editTaskModal = true
}

const removeTaskhandle = () => {
    console.log('remove task')

}

const closeSubtaskForm = () => {
    subtasksForm.value = false
}
const addsubTaskhandle = (e) => {
    e.preventDefault()
   console.log('aqui hago peticion de crear subtask')
    //llamada la funcion en el action y e le pasan los valores y el 
    tasksStore.addSubtask(taskDetails._id, subtaskDescription.value)
}


</script>

<style scoped>
.taskDetail {
    display: flex;
    justify-content: center;
    width: 100%;
    
}
.taskDetailCard{
    display: flex;
    flex-direction: column;
    border: 1px solid rgb(173, 165, 165);
    background-color: #e8ebed;
    border-radius: 0.5rem;
    padding: 3rem;
    width: 80%;
    text-align: center;
}
.card-footer {
    display: flex;
    justify-content: flex-end;
    /* border: 2px solid red; */
    align-items: center;
    margin-top: 3rem;
}
.subtasks {
    display: flex;
    justify-content: center;
    flex-direction: column;
    /* border: 2px solid red; */
    align-items: center;
    margin-top: 3rem;

}
.subtasks h2{

    margin-bottom: 0px;
}
.checkbox{
    display: flex;
    width: fit-content;
    /* border: 2px solid blue; */
    margin-left: 2rem;

}
.checkbox input{
height: fit-content;
margin-left: 15px;
}
.checkbox label{
    /* border: 2px solid green; */
    white-space: nowrap;
}
.remove{
    background-color: red;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    font-size: 20px;
    font-weight: 700;
    margin-left: 2rem;

}
.add-subtask{
    background-color: rgb(41, 113, 53);
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 2rem;
    margin-top: 2rem;
}
.button{
    background-color: #007bff;
    border: none;
    box-shadow: none;
    outline: none;
    font-size: 2rem;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    width: fit-content;
    color: white;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.closing-subtask-form{

    font-size: 3rem;
    margin-top: 0px;
    padding:0;
    padding-right: 1rem;
    /* transform: rotate(-45deg); */
    /* border: 2px solid red; */
    width: 100%;
    display: flex;
    justify-content: flex-end;

}
.closingX{

font-size: 3rem;
margin-top: 0px;
padding:0;
padding-right: 1rem;
transform: rotate(-45deg);
/* border: 2px solid red; */
width: fit-content;
display: flex;
justify-content: flex-end;

}

.subtask-container{
width: 100%;
}

.subtasks-card{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.edit{
    background-color: rgb(0, 98, 255);
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    font-size: 20px;
    font-weight: 700;
    margin-left: 2rem;
}

</style>