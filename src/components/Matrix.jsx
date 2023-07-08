import { useEffect, useState } from "react"
import CreateTask from "./CreateTask"
import Section from "./Section"

const Matrix = ({ currentMatrix }) => {

  console.log(currentMatrix)

  const [tasks, setTasks] = useState([])

  const [tasksDo, setTasksDo] = useState([])
  const [tasksDecide, setTasksDecide] = useState([])
  const [tasksDelegate, setTasksDelegate] = useState([])
  const [tasksDelete, setTasksDelete] = useState([])

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem(currentMatrix.id)) || [])
  }, [currentMatrix.id])

  useEffect(() => {
    const fTasksDo = tasks.filter(task => task.category === "do")
    const fTasksDecide = tasks.filter(task => task.category === "decide")
    const fTasksDelegate = tasks.filter(task => task.category === "delegate")
    const fTasksDelete = tasks.filter(task => task.category === "delete")
  
    setTasksDo(fTasksDo)
    setTasksDecide(fTasksDecide)
    setTasksDelegate(fTasksDelegate)
    setTasksDelete(fTasksDelete)
  }, [tasks])

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
          currentMatrix={currentMatrix}
          tasks={tasksDo} 
          setTasks={setTasks}
          position='col-start-1 row-start-1'
          color='bg-green-200'
          category='do'
        />

        <Section
          currentMatrix={currentMatrix}
          tasks={tasksDecide} 
          setTasks={setTasks}
          position='col-start-2 row-start-1'
          color='bg-blue-200'
          category='decide'
        />

        <Section 
          currentMatrix={currentMatrix}
          tasks={tasksDelegate} 
          setTasks={setTasks}
          position='col-start-1 row-start-2'
          color='bg-orange-200'
          category='delegate'
        />

        <Section 
          currentMatrix={currentMatrix}
          tasks={tasksDelete} 
          setTasks={setTasks}
          position='col-start-2 row-start-2'
          color='bg-red-200'
          category='delete'
        />        
        
    </div>
  </div>
  )
}

export default Matrix