import { defineStore } from "pinia";
import { useAuthStore } from '../store/auth'
// import { pinia } from "pinia";
import axios from "axios";

export const useTodoStore = defineStore('todo', { //'todo' nombre del store
    state: () => ({
        tasks: [],
        filteredTasks: [],
        subtasks: null,
        editTaskModal: false,
        currentTask: null,
        areTaskLoaded: false,
        searchBarFilters: ['Select a filter...','daily', 'long term task', 'short term task', 'health', 'skills']
    }),

    actions: {
        async setTasksFromStorage() {
            const api = axios.create({
                baseURL: "http://localhost:5000/api/v1",
                withCredentials: true
              });
            const authStore = useAuthStore();
            const token = authStore.token;
            try {
                const res = await api.get('/tasks',
                {
                  headers: {
                    'Authorization': 'Bearer ' + token
                  }
                });
                this.tasks = res.data.tasks
                this.filteredTasks = this.tasks
                const taskIds= this.filteredTasks.map(taskId => taskId._id)
                this.setSubtasks(taskIds)
                // this.areTaskLoaded = true
            } catch (error) {
                console.log(error)
            }
        }, 

        async setSubtasks(taskIds) {    
            const api = axios.create({
                baseURL: "http://localhost:5000/api/v1",
                withCredentials: true
            });
            const authStore = useAuthStore();
            const token = authStore.token;
            try {
                const res = await api.get('/subtasks',
                {
                  headers: {
                    'Authorization': 'Bearer ' + token,
                    'taskIds': taskIds
                  }
                });
                this.subtasks = res.data.subtasks
                this.filteredTasks = this.filteredTasks.map((task) => {
                    task.subtasks = [];
                    task.percentageOfCompletition = 0; 
                    return task;
                });
                this.filteredTasks.forEach(task => {
                    this.subtasks.forEach(subtask => {
                        if(task._id === subtask.tid){
                            task.subtasks.push(subtask)
                        }
                    })
                })
                //--------------------------------------------/// porcentajes
                this.filteredTasks.forEach(task => {
                    let counter = 0
                    task.subtasks.forEach(subtask => {
                        if(subtask.subtaskStatus === true){
                            counter = counter + 1
                        }})
                        if(task.subtasks.length > 0){
                            const percentage = ((counter/ task.subtasks.length)*100).toString() + "%"
                            task.percentageOfCompletition = percentage
                        }else{
                            task.percentageOfCompletition = "0%"
                        }})
                        // this.filteredTasks = this.tasks
            } catch (error) {
                console.log(error)
            }
            },

        async removeTasks(taskId) {
            const api = axios.create({
                baseURL: "http://localhost:5000/api/v1",
                withCredentials: true
            });
            const authStore = useAuthStore();
            const token = authStore.token;
            try {
                const res = await api.delete(`/tasks/${taskId}`,
                {
                    id: taskId
                },
                {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    },
                    params: {
                        id: taskId
                      }
                });
            } catch (error) {
                console.log(error)
            }
    // cambiar el this.setTasksFromStorage() for un si la respeusta de la llamada al delete da 200 entonces 
    //elimino del state esa task, asi me ahorro una llamada y puedo hacer una transicion de que se va esa task
            this.setTasksFromStorage()
        },
        async removeSubtask(subtaskId) {
            const api = axios.create({
                baseURL: "http://localhost:5000/api/v1",
                withCredentials: true
              });
            const authStore = useAuthStore();
            const token = authStore.token;
            try {
                const res = await api.delete(`/subtasks/${subtaskId}`,
                {
                   id: subtaskId
                },
                {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    },
                    params: {
                        id: subtaskId
                    }
                });
                this.subtasks = this.subtasks.filter(subtask => subtask._id !== subtaskId)
                this.filteredTasks = this.filteredTasks.map((task) => {
                    task.subtasks = [];
                    task.percentageOfCompletition = 0; 
                    return task;
                });
                this.filteredTasks.forEach(task => {
                    this.subtasks.forEach(subtask => {
                        if(task._id === subtask.tid){
                            task.subtasks.push(subtask)
                        }
                    })
                })
                
            } catch (error) {
                console.log(error)
            }
      },

        async addTask(taskName, deathline, taskDescription, priority, category) {
            const api = axios.create({
                baseURL: "http://localhost:5000/api/v1",
                withCredentials: true
            });
            const authStore = useAuthStore();
            const token = authStore.token;
            try {
                const res = await api.post('/tasks',
                {
                  taskName: taskName,
                  deathline: deathline,
                  priority: priority,
                  taskDescription: taskDescription,
                  category: category
                },
                {
                  headers: {
                    'Authorization': 'Bearer ' + token
                  }
                });
                this.filteredTasks.push(res.data.newTask)
            } catch (error) {
                console.log(error)
            }
        },

        async addSubtask(subtaskId, subtaskDescription) {
            const api = axios.create({
                baseURL: "http://localhost:5000/api/v1",
                withCredentials: true
            });
            const authStore = useAuthStore();
            const token = authStore.token;
            try {
                const res = await api.post('/subtasks',
                {
                    tid: subtaskId,
                    subtaskDescription: subtaskDescription
                },
                {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                });
                this.subtasks.push(res.data.newSubtask)
                // this.subtasks = [...this.subtasks, res.data.newSubtask]
                // this.currentTask= this.subtasks

                this.filteredTasks = this.filteredTasks.map((task) => {
                    task.subtasks = [];
                    task.percentageOfCompletition = 0; 
                    return task;
                });
                this.filteredTasks.forEach(task => {
                    this.subtasks.forEach(subtask => {
                        if(task._id === subtask.tid){
                            task.subtasks.push(subtask)
                        }
                    })
                })
                

            } catch (error) {
                console.log(error)
            }
      },

      async editTasks(taskId, taskName, deathline, taskDescription, priority, category, taskcompleted) {  
          const api = axios.create({
              baseURL: "http://localhost:5000/api/v1",
              withCredentials: true
            });
          const authStore = useAuthStore();
          const token = authStore.token;
          try {
              const res = await api.patch(`/tasks/${taskId}`,
              {
                  taskName: taskName,
                  deathline: deathline,
                  priority: priority,
                  taskDescription: taskDescription,
                  taskStatus: 0,
                  category: category,
                  taskcompleted: taskcompleted
              },
              {
                headers: {
                  'Authorization': 'Bearer ' + token
                },
                params: {
                    id: taskId
                }
              });

          } catch (error) {
              console.log(error)
          }
// cambiar el this.setTasksFromStorage() for un si la respeusta de la llamada al delete da 200 entonces 
//elimino del state esa task, asi me ahorro una llamada y puedo hacer una transicion de que se va esa task
        // this.setTasksFromStorage()
    },
        async completeTasks(taskId, taskName, deathline, taskDescription, priority, category, taskStatus, taskcompleted) {
            const api = axios.create({
                baseURL: "http://localhost:5000/api/v1",
                withCredentials: true
              });
            const authStore = useAuthStore();
            const token = authStore.token;
            try {
                await api.patch(`/tasks/${taskId}`,
                {
                    taskName: taskName,
                    deathline: deathline,
                    priority: priority,
                    taskDescription: taskDescription,
                    taskStatus: taskStatus,
                    category: category,
                    taskcompleted: taskcompleted
                },
                {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    },
                    params: {
                        id: taskId
                    }
                });
              } catch (error) {
                  console.log(error)
              }
      // cambiar el this.setTasksFromStorage() for un si la respeusta de la llamada al delete da 200 entonces 
      //elimino del state esa task, asi me ahorro una llamada y puedo hacer una transicion de que se va esa task
           },
      async completeSubtasks(subtaskId, subtaskDescription, subtaskStatus ) {
          const api = axios.create({
              baseURL: "http://localhost:5000/api/v1",
              withCredentials: true
            });
          const authStore = useAuthStore();
          const token = authStore.token;
          try {
              const res = await api.patch(`/subtasks/${subtaskId}`,
              {
                  subtaskDescription: subtaskDescription,
                  subtaskStatus: subtaskStatus
              },
              {
                  headers: {
                      'Authorization': 'Bearer ' + token
                  },
                  params: {
                      id: subtaskId
                  }
              });
          } catch (error) {
              console.log(error)
          }
      },
  }
})