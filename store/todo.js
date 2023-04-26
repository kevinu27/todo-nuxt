import { defineStore } from "pinia";

export const useTodoStore = defineStore('todo', { //'todo' nombre del store
    state: () => ({
        task: [],
    }),
    actions: {
        async setTasksFromStorage() {
            const task = await JSON.parse(localStorage.getItem("tasks"));
            console.log('taskStore', task)
        }
    }

})