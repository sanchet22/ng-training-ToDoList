const TaskService = {
    getTasks: () => {
      // Simulate API call
      return Promise.resolve(JSON.parse(localStorage.getItem('tasks')) || []);
    },
    saveTasks: (tasks) => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  };
  
  export default TaskService;
  