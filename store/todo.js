import { defineStore } from "pinia";
import { useAuthStore } from '../store/auth'
// import { pinia } from "pinia";
import axios from "axios";

export const useTodoStore = defineStore('todo', { //'todo' nombre del store
    state: () => ({
        tasks: [],
        subtasks: null,
        editTaskModal: false,
        currentTask: null
    }),

    actions: {
        async setTasksFromStorage() {
            const api = axios.create({
                baseURL: "http://localhost:5000/api/v1",
                withCredentials: true
              });
            const authStore = useAuthStore();
            const token = authStore.token;
            console.log('token del list en el authstore', token)
            try {
                const res = await api.get('/tasks',
                {
                  headers: {
                    'Authorization': 'Bearer ' + token
                  }
                });
                console.log('res------setTasksFromStorage',  res.data)
                this.tasks = res.data.tasks
                const taskIds= this.tasks.map(taskId => taskId._id)
                console.log('-------taskIds---', this.tasks)
                console.log('-------taskIds---', taskIds)
                this.setSubtasks(taskIds)
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
                this.tasks = this.tasks.map((task) => {
                    task.subtasks = [];
                    task.percentageOfCompletition = 0; 
                    return task;
                });
              
                this.tasks.forEach(task => {
                    this.subtasks.forEach(subtask => {
                        if(task._id === subtask.tid){
                            task.subtasks.push(subtask)
                        }
                    })
                })
                //--------------------------------------------/// porcentajes
                this.tasks.forEach(task => {
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
                console.log('la buena!!!!! los percentajes', this.tasks)
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
                console.log('token del store pero en el form', token)
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
                  console.log('res------', res)
            } catch (error) {
                console.log(error)
            }

            // this.setTasksFromStorage() aqui poner la que llama a cargar las subtasks
      },

        async addTask(taskName, deathline, taskDescription, priority, category) {
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
            taskDescription: taskDescription,
            category: category
          },
          {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });
            this.tasks.push(res.data.newTask)
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
      
      

      },
      async editTasks(taskId, taskName, deathline, taskDescription, priority, category, taskcompleted) {
        console.log('taskId++++++++++', taskId)
        console.log('task.taskDescription++++++++++', taskDescription)
        
        const api = axios.create({
            baseURL: "http://localhost:5000/api/v1",
            withCredentials: true
          });
        const authStore = useAuthStore();
        const token = authStore.token;
        
        try {
            console.log('token del store pero en el form', token)
            const res = await api.patch(
        `/tasks/${taskId}`,
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
      }
    );
                console.log('res------', res)
        } catch (error) {
            console.log(error)
        }
// cambiar el this.setTasksFromStorage() for un si la respeusta de la llamada al delete da 200 entonces 
//elimino del state esa task, asi me ahorro una llamada y puedo hacer una transicion de que se va esa task
        // this.setTasksFromStorage()
    },
    async completeTasks(taskId, taskName, deathline, taskDescription, priority, category, taskStatus, taskcompleted) {
      console.log('taskStatus++++++++++', taskStatus)
      console.log('task.taskDescription++++++++++', taskDescription)
      
      const api = axios.create({
          baseURL: "http://localhost:5000/api/v1",
          withCredentials: true
        });
      const authStore = useAuthStore();
      const token = authStore.token;
      
      try {
          console.log('token del store pero en el form', token)
          const res = await api.patch(
      `/tasks/${taskId}`,
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
    }
  );
              console.log('res------', res)
      } catch (error) {
          console.log(error)
      }
// cambiar el this.setTasksFromStorage() for un si la respeusta de la llamada al delete da 200 entonces 
//elimino del state esa task, asi me ahorro una llamada y puedo hacer una transicion de que se va esa task
      // this.setTasksFromStorage()
  },
  async completeSubtasks(subtaskId, subtaskDescription, subtaskStatus ) {
    
    const api = axios.create({
        baseURL: "http://localhost:5000/api/v1",
        withCredentials: true
      });
    const authStore = useAuthStore();
    const token = authStore.token;
    
    try {
        console.log('token del store pero en el form', token)
        const res = await api.patch(
    `/subtasks/${subtaskId}`,
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
  }
);
            console.log('res------', res)
    } catch (error) {
        console.log(error)
    }
// cambiar el this.setTasksFromStorage() for un si la respeusta de la llamada al delete da 200 entonces 
//elimino del state esa task, asi me ahorro una llamada y puedo hacer una transicion de que se va esa task
    // this.setTasksFromStorage()
},


    }

})