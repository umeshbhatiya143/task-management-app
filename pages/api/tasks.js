export const getTasks = () => {
    if (typeof window !== "undefined") {
      const tasks = localStorage.getItem("tasks");
      return tasks ? JSON.parse(tasks) : [];
    }
    return [];
  };
  
  export const saveTasks = (tasks) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };
  