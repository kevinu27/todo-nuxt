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
        },
        async addTask(taskName, deathline, taskDescription, priority, id) {
            const tasks = JSON.parse(localStorage.getItem("tasks"));
            tasks.push({
                taskName: taskName,
                deathline: deathline,
                taskDescription: taskDescription,
                priority: priority,
                id: id
            })
            console.log('tasks localStorage', tasks)
            localStorage.setItem("tasks", JSON.stringify(tasks));
            this.tasks = tasks
        }
    }

})