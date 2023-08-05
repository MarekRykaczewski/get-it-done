import { useEffect, useState } from "react"
import CreateTask from "./CreateTask"
import Section from "./Section"

const Matrix = ({ currentMatrix }) => {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem(currentMatrix.id)) || [])
  }, [currentMatrix.id])

  const positionMap = {
    do: { col: 1, row: 1, color: 'bg-green-300' },
    decide: { col: 2, row: 1, color: 'bg-blue-300' },
    delegate: { col: 1, row: 2, color: 'bg-orange-300' },
    delete: { col: 2, row: 2, color: 'bg-red-300' },
  };

  return (  
    <div className="flex flex-col items-center justify-center gap-5 py-5 px-10 h-full">
      <h1 className='text-3xl font-bold text-slate-500 max-w-[800px] drop-shadow'> {currentMatrix.name}</h1>
      <CreateTask 
        currentMatrix={currentMatrix}
        setTasks={setTasks} 
      />
     <div className='grid grid-rows-2 grid-cols-2 h-full aspect-square'>
                
     {Object.keys(positionMap).map((category) => {
      const { col, row, color } = positionMap[category];
      const sectionTasks = tasks.filter((task) => task.category === category);

      return (
        <Section
          key={`${category}_${currentMatrix.id}`}
          currentMatrix={currentMatrix}
          tasks={tasks}
          setTasks={setTasks}
          sectionTasks={sectionTasks}
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