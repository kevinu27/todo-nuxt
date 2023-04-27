import { defineStore } from "pinia";

export const useTodoStore = defineStore('todo', { //'todo' nombre del store
    state: () => ({
        tasks: [],
    }),
    actions: {
        async setTasksFromStorage() {
            const tasks = await JSON.parse(localStorage.getItem("tasks"));
            this.tasks = tasks
        },
        async removeTasksFromStorage(taskId) {
            this.tasks =  this.tasks.filter(task => task.id !== taskId)
            localStorage.setItem("tasks", JSON.stringify(  this.tasks));
        }
    }

})