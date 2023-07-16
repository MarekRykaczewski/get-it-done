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

  const contextValue = {
    toggleComplete
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};