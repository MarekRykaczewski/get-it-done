import { useEffect, useState } from "react"
import CreateTask from "./CreateTask"
import Section from "./Section"

const Matrix = ({ currentMatrix }) => {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem(currentMatrix.id)) || [])
  }, [currentMatrix.id])

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

  const positionMap = {
    do: { col: 1, row: 1, color: 'bg-green-200' },
    decide: { col: 2, row: 1, color: 'bg-blue-200' },
    delegate: { col: 1, row: 2, color: 'bg-orange-200' },
    delete: { col: 2, row: 2, color: 'bg-red-200' },
  };

  return (  
    <div className="flex flex-col items-center gap-5">
      <h1 className='text-xl font-bold'> {currentMatrix.name}</h1>
      <CreateTask 
        currentMatrix={currentMatrix}
        tasks={tasks} 
        setTasks={setTasks} 
      />
     <div className='grid grid-rows-2 grid-cols-2 auto-cols-min auto-rows-min px-10'>
                
     {Object.keys(positionMap).map((category) => {
      const { col, row, color } = positionMap[category];
      const sectionTasks = tasks.filter((task) => task.category === category);

      return (
        <Section
          key={`${category}_${currentMatrix.id}`}
          currentMatrix={currentMatrix}
          setTasks={setTasks}
          tasks={sectionTasks}
          handleEdit={handleEdit}
          position={`col-start-${col} row-start-${row}`}
          color={color}
          category={category}
        />
      );
    })}
        
    </div>
  </div>
  )
}

export default Matrix