<template>
    <div >
        <select v-model="SelectedFilter" class="select"  @change="handleFilterChange">
             <option :value=filter v-for="filter in tasksStore.searchBarFilters" :key="filter">{{ filter}}</option>
        </select>
    </div>
</template>

<script setup>
import { useTodoStore } from '~/store/todo';
const tasksStore = useTodoStore();
const SelectedFilter = ref(tasksStore.searchBarFilters[0]);

function handleFilterChange(e) {
  e.preventDefault()
  console.log(tasksStore.filteredTasks);
  if(SelectedFilter.value === tasksStore.searchBarFilters[0] ){
    console.log('tasksStore.searchBarFilters[0]')
    tasksStore.filteredTasks = tasksStore.tasks

  }else {
    tasksStore.filteredTasks = tasksStore.tasks
    tasksStore.filteredTasks.map(task => console.log(task.category) )
    console.log(tasksStore.filteredTasks.category)
    console.log('tasksStore.filteredTasks antes', tasksStore.filteredTasks)

    tasksStore.filteredTasks =  tasksStore.filteredTasks.filter(task =>{ 
      console.log(' task.category == SelectedFilter', task.category, "+" , SelectedFilter.value)
     return task.category === SelectedFilter.value})
    console.log('tasksStore.filteredTasks despues', tasksStore.filteredTasks)
  }
}
</script>


<style scoped>
body {
  font-family: Helvetica, sans-serif;
  background: #23242a;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

/* .dropdown {
  min-width: 15em;
  position: relative;
  margin: 2em;
  height: 3rem;
  padding: 0;
  
} */

.dropdown * {
  box-sizing: border-box;
}

.select {
  background: #2a2f3b;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px #2a2f3b solid;
  border-radius: 0.5em;
  padding-left: 1em;
  cursor: pointer;
  transition: background 0.3s;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0.3rem;
  border-top-left-radius: 0.3rem;
  height: 3rem;
  font-weight: bold;
  font-size: 1rem;
}


.select-clicked {
  border: 2px #26489a solid;
  box-shadow: 0 0 0.8em #26489a;
}

.select:hover {
  background: #323741;
}

.caret {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #fff;
  transition: 0.3s;
}


.caret-rotate {
  transform: rotate(180deg);
}

.menu {
  list-style: none;
  padding: 0.2em 0.5em;
  background: #323741;
  border: 1px #363a43 solid;
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.2);
  border-radius: 0.5em;
  color: #9fa5b5;
  position: absolute;
  top: 3em;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  opacity: 0;
  display: none;
  transition: 0.2s;
  z-index: 1;
}

.menu li {
  padding: 0.7em 0.5em;
  margin: 0.3em 0;
  border-radius: 0.5em;
  cursor: pointer;
}

.menu li:hover {
  background: #2a2d35;
}


.active {
  background: #23242a;
}


.menu-open {
  display: block;
  opacity: 1;
}


</style>