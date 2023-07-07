import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const CreateTask = ({ tasks, setTasks }) => {

  const TASK_TEMPLATE = {
    id: "",
    name: "",
    done: false,
    category: "do" // do, decide, delegate, delete
  }

  const [task, setTask] = useState(TASK_TEMPLATE)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (task.name.length < 3) {
      console.log("Task must be at least 3 characters long")
    } else {

      setTasks((prev) => {
        const list = [...prev, task]
  
        localStorage.setItem("tasks", JSON.stringify(list))
  
        return list
      })
  
      setTask(TASK_TEMPLATE)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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