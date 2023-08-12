<template>
    <div>
        <removingTaskModal v-if="tasksStore.stagingRemovalModal">
    <h3> Are you sure you want to remove this task?</h3>
              <div class="buttons">
                <button class="accept-button" @click="aceptRemoval">Yes</button>
                <button class="cancel-button" @click=" tasksStore.stagingRemovalModal = false">No</button>
              </div>
</removingTaskModal>
    
    <Transition name="fade2">  
        <div v-if="showTask">
            <NuxtLink :to="`/task/${props.task._id}`" class="big-task"> 
                <div class="task" >
                    <div class="closing"  ><span @click.prevent.stop="stagingRemoval"> + </span></div>
                    <div class="warning-icon" v-if="!isToday">  
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="red"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            width="30" 
                            height="30" 
                            >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12" y2="16" />
                        </svg>
                    </div>
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
                <span class="completetion-percentage"> {{props.task.percentageOfCompletition}}  
                </span>
            </div>
        </div>
        </div>
        </NuxtLink >

        </div>
</Transition>
</div>
</template>


<script setup>
import { useTodoStore } from '~/store/todo';
const showTask = ref(true)
// console.log('showtask', showTask.value )
console.log('props.task._id para el removal---', props.task._id)

const tasksStore = useTodoStore()

const props = defineProps({
  task: Object
})
const taskData = ref('')

onMounted(() => {
taskData.value =  props.task
})
// console.log('taskData.value---', taskData.value)

const isToday = computed(() => {
    const now = new Date();
    const day = parseInt(props.task.deathline.slice(-2))
    const month = parseInt(props.task.deathline.slice(5, 7))

    let dayIsGood 
    let monthIsGood
    // console.log('now.getDate()',  now.getDate()) 
    // console.log('day',  day) 
    
    if(now.getDate() < day){
         dayIsGood = true
        //  console.log('now.getDate() < day',  dayIsGood)
    }else {
        
        dayIsGood = false
        // console.log('not now.getDate() < day',  dayIsGood)
    }
   
    if(now.getMonth()+1 < month){
         monthIsGood = true
        // console.log('now.getMonth() <= month',  monthIsGood)

    }else {
         monthIsGood = false
        // console.log(' not now.getMonth() <= month',  monthIsGood)

    }
if(monthIsGood && dayIsGood){
    return true
}
if(now.getMonth()+1 === month && dayIsGood){
    // console.log('entro aqui')
    // console.log('now.getMonth()', now.getMonth())
    return true
}
if(!monthIsGood && !dayIsGood){
    return false
}

    if(monthIsGood ){
        if(dayIsGood){
            return true
        }else {
            return false
        }
    }else {
        return false
    }

});

const stagingRemoval = () => {
    // stagingRemovalModal.value = true
    tasksStore.stagingRemovalModal = true
    tasksStore.taskIdToRemove = props.task._id
console.log('tasksStore.taskIdToRemove---', tasksStore.taskIdToRemove)

}

const removeTask = () => {

    
    showTask.value = false
    tasksStore.stagingRemovalModal = true
    tasksStore.stagingRemoval = true
    console.log('props.task._id para el removal', props.task._id)
    setTimeout(function() {
        tasksStore.removeTasks( tasksStore.taskIdToRemove)
}, 3000)
}


const aceptRemoval = () => {
//   tasksStore.removalConfirmationPositive = true eliminar esto del store
removeTask()

  tasksStore.stagingRemovalModal = false


}
console.log('--------')
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
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

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

    background-color:rgb(96, 96, 129);
    height: 10px;
    width: 70%;
    margin-left: 1rem;
    border-radius: 5px;
}
.completition-bar-inner{
    background-color:rgb(0, 0, 128);

    height: 100%;
    border-radius: 5px;


}

.completition{
    padding-left: 2rem;
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
}
/* .completetion-percentage{

} */

.fade2-leave-from{
    opacity: 1;
}
.fade2-leave-to{
    opacity: 0;
    transform: translateX(-100px);
}
.fade2-leave-active{
    transition: all 2s ease;
}
.buttons{
  display: flex;
  justify-content: center;
  /* border: 2px solid green; */
  width: 100%;
}
.accept-button{
background-color: green;
margin-right: 1rem;
}
.cancel-button{
background-color: red;
margin-left: 1rem;

}
.warning-icon{
    display: flex;
    justify-content: center;
}

</style>