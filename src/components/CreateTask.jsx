import { useContext, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { TaskContext } from '../contexts/TaskContext'

const CreateTask = ({ currentMatrix, setTasks }) => {

  const TASK_TEMPLATE = {
    id: "",
    name: "",
    completed: false,
    category: "do" // do, decide, delegate, delete
  }

  const { addTask } = useContext(TaskContext);

  const [task, setTask] = useState(TASK_TEMPLATE)

  const handleAddTask = (e) => {
    e.preventDefault()

    if (task.name.length < 3) {
      console.log("Task must be at least 3 characters long")
    } else {
      addTask(currentMatrix.id, task, setTasks)  
      setTask(TASK_TEMPLATE)
    }
  }

  return (
    <form className="flex" onSubmit={(e) => handleAddTask(e)}>
      <input 
      type="text" 
      className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
      value={task.name}
      onChange={(e) => setTask({...task, id: uuidv4(), name: e.target.value, createdAt: Date.now()})} 
      />
      <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">
        Create
      </button>
    </form>
  )
}

export default CreateTask