import { createContext } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  
  const toggleComplete = (taskId, matrixId, setTasks, tasks) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    // Update the tasks and store in local storage
    setTasks(updatedTasks)
    localStorage.setItem(matrixId, JSON.stringify(updatedTasks));
    console.log("Toggle Complete - Updated Tasks:", updatedTasks);
  };

  const removeTask = (id, matrixId, setTasks, tasks) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    // Update the tasks and store in local storage
    setTasks(updatedTasks)
    localStorage.setItem(matrixId, JSON.stringify(updatedTasks));
    console.log("Task Removed - Updated Tasks:", updatedTasks);
  };

  const editTask = (id, matrixId, updatedName, setTasks, tasks) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, name: updatedName };
      }
      return task;
    });

    // Update the tasks and store in local storage
    setTasks(updatedTasks)
    localStorage.setItem(matrixId, JSON.stringify(updatedTasks));
    console.log("Handle Edit - Updated Tasks:", updatedTasks);
  };

  const addTask = (matrixId, newTask, setTasks) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      localStorage.setItem(matrixId, JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const contextValue = {
    toggleComplete,
    removeTask,
    editTask,
    addTask
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};