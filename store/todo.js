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
                    console.log('res------',  res.data)
                    this.tasks = res.data.tasks
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