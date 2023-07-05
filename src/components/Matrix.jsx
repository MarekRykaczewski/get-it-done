import { useEffect, useState } from "react"
import CreateTask from "./CreateTask"
import Task from "./Task"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Matrix = () => {

  const [tasks, setTasks] = useState([])

  const [tasksDo, setTasksDo] = useState([])
  const [tasksDecide, setTasksDecide] = useState([])
  const [tasksDelegate, setTasksDelegate] = useState([])
  const [tasksDelete, setTasksDelete] = useState([])

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")) || [])
  }, [])

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
      <h1 className='text-xl font-bold'>Name of matrix</h1>
      <CreateTask 
        tasks={tasks} 
        setTasks={setTasks} 
      />
     <div className='grid auto-cols-min auto-rows-min px-10'>
                
        <DndProvider backend={HTML5Backend}>       
        <div className='flex flex-col p-3 gap-2 items-center justify-center col-start-1 row-start-1 bg-green-200 w-[400px] h-[400px]'>
          {tasksDo?.map(task => (
            <Task key={task.id} id={task.id}> {task.name} </Task>
          ))}
        </div>

        <div className='col-start-2 row-start-1 bg-blue-200 w-[400px] h-[400px]'>
          {tasksDecide?.map(task => (
            <Task key={task.id} id={task.id}> {task.name} </Task>
          ))}
        </div>

        <div className='col-start-1 row-start-2 bg-orange-200 w-[400px] h-[400px]'>
          {tasksDelegate?.map(task => (
            <Task key={task.id} id={task.id}> {task.name} </Task>
          ))}
        </div>

        <div className='col-start-2 row-start-2 bg-red-200 w-[400px] h-[400px]'>
          {tasksDelete?.map(task => (
            <Task key={task.id} id={task.id}> {task.name} </Task>
          ))}
        </div>
        </DndProvider> 

    </div>
  </div>
  )
}

export default Matrix