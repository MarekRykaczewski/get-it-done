import { useEffect, useState } from "react"
import CreateTask from "./CreateTask"
import Section from "./Section"

const Matrix = ({ currentMatrix }) => {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem(currentMatrix.id)) || [])
  }, [currentMatrix.id])

  const tasksDo = tasks.filter((task) => task.category === "do");
  const tasksDecide = tasks.filter((task) => task.category === "decide");
  const tasksDelegate = tasks.filter((task) => task.category === "delegate");
  const tasksDelete = tasks.filter((task) => task.category === "delete");

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem(currentMatrix.id, JSON.stringify(updatedTasks));
  };

  const handleRemove = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem(currentMatrix.id, JSON.stringify(updatedTasks));
  };

  const handleEdit = (id, updatedName) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, name: updatedName };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem(currentMatrix.id, JSON.stringify(updatedTasks));
  };

  return (  
    <div className="flex flex-col items-center gap-5">
      <h1 className='text-xl font-bold'> {currentMatrix.name}</h1>
      <CreateTask 
        currentMatrix={currentMatrix}
        tasks={tasks} 
        setTasks={setTasks} 
      />
     <div className='grid auto-cols-min auto-rows-min px-10'>
                
        <Section 
          key={`do_${currentMatrix.id}`}
          currentMatrix={currentMatrix}
          tasks={tasksDo} 
          toggleComplete={toggleComplete}
          handleRemove={handleRemove}
          handleEdit={handleEdit}
          position='col-start-1 row-start-1'
          color='bg-green-200'
          category='do'
        />

        <Section
          key={`decide_${currentMatrix.id}`}
          currentMatrix={currentMatrix}
          tasks={tasksDecide} 
          toggleComplete={toggleComplete}
          handleRemove={handleRemove}
          handleEdit={handleEdit}
          position='col-start-2 row-start-1'
          color='bg-blue-200'
          category='decide'
        />

        <Section 
          key={`delegate_${currentMatrix.id}`}
          currentMatrix={currentMatrix}
          tasks={tasksDelegate} 
          toggleComplete={toggleComplete}
          handleRemove={handleRemove}
          handleEdit={handleEdit}
          position='col-start-1 row-start-2'
          color='bg-orange-200'
          category='delegate'
        />

        <Section 
          key={`delete_${currentMatrix.id}`}
          currentMatrix={currentMatrix}
          tasks={tasksDelete} 
          toggleComplete={toggleComplete}
          handleRemove={handleRemove}
          handleEdit={handleEdit}
          position='col-start-2 row-start-2'
          color='bg-red-200'
          category='delete'
        />        
        
    </div>
  </div>
  )
}

export default Matrix