import { defineStore } from "pinia";
import { useAuthStore } from '../store/auth'
// import { pinia } from "pinia";
import axios from "axios";

export const useTodoStore = defineStore('todo', { //'todo' nombre del store
    state: () => ({
        tasks: [],
    }),

    actions: {
        async setTasksFromStorage() {
            const authStore = useAuthStore();
            const tasks = await JSON.parse(localStorage.getItem("tasks"));
            this.tasks = tasks
            // const isLoggedIn = authStore.isLoggedIn;
            const token = authStore.token;
            console.log('---------token', token)
        },
        async removeTasksFromStorage(taskId) {
            this.tasks =  this.tasks.filter(task => task.id !== taskId)
            localStorage.setItem("tasks", JSON.stringify(  this.tasks));
        },
        async addTask(taskName, deathline, taskDescription, priority, id) {
            const api = axios.create({
                baseURL: "http://localhost:5000/api/v1",
                withCredentials: true
              });
              const authStore = useAuthStore();
            const token = authStore.token;
            console.log("token que parece que no funciona----!!!!---", useAuthStore)
            // const tasks = JSON.parse(localStorage.getItem("tasks"));
            // tasks.push({
            //     taskName: taskName,
            //     deathline: deathline,
            //     taskDescription: taskDescription,
            //     priority: priority,
            //     id: id
            // })
            // console.log('tasks localStorage', tasks)
            // localStorage.setItem("tasks", JSON.stringify(tasks));
            // this.tasks = tasks
            try {
                console.log('token del store pero en el form', token)
                const res = await api.post(
          '/tasks',
          {
            taskName: taskName,
            deathline: deathline,
            priority: priority,
            taskDescription: taskDescription
          },
          {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
        );
                    console.log('res------', res.data)
            } catch (error) {
                console.log(error)
            }
        
        

        }
    }

})