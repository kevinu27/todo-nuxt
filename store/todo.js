import { defineStore } from "pinia";
import { useAuthStore } from '../store/auth'
// import { pinia } from "pinia";
import axios from "axios";

export const useTodoStore = defineStore('todo', { //'todo' nombre del store
    state: () => ({
        tasks: [],
        subtasks: null,
    }),

    actions: {
        async setTasksFromStorage() {
            console.log('empieza el coger las tasks del store y de la llamada')
            const api = axios.create({
                baseURL: "http://localhost:5000/api/v1",
                withCredentials: true
              });
              const authStore = useAuthStore();
            //   await authStore.$state.token;
            const token = authStore.token;
              console.log('token del list en el authstore', token)
              try {
                console.log('token del store pero en el form', token)
                const res = await api.get(
                    '/tasks',


          {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
        );
                    console.log('res------setTasksFromStorage',  res.data)
                    this.tasks = res.data.tasks
            } catch (error) {
                console.log(error)
            }


            
        }, async setSubtasks(taskIds) {
          console.log('Subtasks, taskIds', taskIds)
          const api = axios.create({
              baseURL: "http://localhost:5000/api/v1",
              withCredentials: true
            });
            const authStore = useAuthStore();
          //   await authStore.$state.token;
          const token = authStore.token;
            console.log('token del list en el authstore', token)
            try {
              console.log('token del store pero en el form', token)
              const res = await api.get(
                  '/subtasks',


        {
          headers: {
            'Authorization': 'Bearer ' + token,
            'taskIds': taskIds
          }
        }
      );
      console.log('---------res.data del subtask---------', res.data)
      this.subtasks = res.data.subtasks
      console.log('---------this.subtask---------', this.subtasks[0])

        this.tasks = this.tasks.map((task) => {
          task.subtasks = []; 
          return task;
        });

          console.log('this.task---!!!!!!++++', this.tasks )        
          this.tasks.forEach(task => {
                   this.subtasks.forEach(subtask => {
                    if(task._id === subtask.tid){
                      task.subtasks.push(subtask)
                    }
                  console.log('subtasks in the loop', subtask)
                   }) 
                  console.log('task in the loop', task)
          })
          console.log('a ver si funciono el task', this.tasks)
          console.log('a ver si funciono el subtask', this.subtasks)
          } catch (error) {
              console.log(error)
          }


          
      },
        async removeTasks(taskId) {
            console.log('taskId', taskId)
            const api = axios.create({
                baseURL: "http://localhost:5000/api/v1",
                withCredentials: true
              });
            const authStore = useAuthStore();
            const token = authStore.token;
            
            try {
                console.log('token del store pero en el form', token)
                const res = await api.delete(
            `/tasks/${taskId}`,
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
          }
        );
                    console.log('res------', res)
            } catch (error) {
                console.log(error)
            }
// cambiar el this.setTasksFromStorage() for un si la respeusta de la llamada al delete da 200 entonces 
//elimino del state esa task, asi me ahorro una llamada y puedo hacer una transicion de que se va esa task
            this.setTasksFromStorage()
        },

        async addTask(taskName, deathline, taskDescription, priority) {
            const api = axios.create({
                baseURL: "http://localhost:5000/api/v1",
                withCredentials: true
              });
            const authStore = useAuthStore();
            const token = authStore.token;

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
        
        

        },

        async addSubtask(subtaskId, subtaskDescription) {
          console.log('addSubtask en el todo store')
          const api = axios.create({
              baseURL: "http://localhost:5000/api/v1",
              withCredentials: true
            });
          const authStore = useAuthStore();
          const token = authStore.token;

          try {
              console.log('token del store pero en el form', token)
              const res = await api.post(
        '/subtasks',
        {
          tid: subtaskId,
          subtaskDescription: subtaskDescription
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