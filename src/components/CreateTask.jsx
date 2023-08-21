import { useContext, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { TaskContext } from '../contexts/TaskContext'
import { useSettings } from "../contexts/SettingsContext";

const CreateTask = ({ currentMatrix, setTasks }) => {

  const { settings } = useSettings()

  const TASK_TEMPLATE = {
    id: uuidv4(),
    name: "",
    completed: false,
    category: "do" // do, decide, delegate, delete
  }

  const { addTask } = useContext(TaskContext);
  const [task, setTask] = useState(TASK_TEMPLATE)

  const isTaskNameValid = () => {
    return task.name.length >= 3;
  };

  const handleAddTask = (e) => {
    e.preventDefault()

    if (!isTaskNameValid()) {
      console.log("Task must be at least 3 characters long");
      return;
    }

    addTask(currentMatrix.id, task, setTasks)  
    setTask(TASK_TEMPLATE)
  }

  const handleTaskNameChange = (e) => {
    setTask({ ...task, name: e.target.value });
  };

  return (
    <form className="flex" onSubmit={(e) => handleAddTask(e)}>
      <input 
      type="text" 
      className={`border-2 border-slate-400 text-lg ${settings.darkMode ? "bg-slate-500 text-white" : "bg-slate-100 text-slate-800"} transition-colors duration-500 rounded-md mr-4 pl-2 h-12 w-64 px-1`}
      value={task.name}
      onChange={handleTaskNameChange}
      placeholder="Create a new Task..." 
      />
      <button className="bg-cyan-500 text-md text-lg rounded-md px-4 h-12 text-white">
        Create
      </button>
    </form>
  )
}

export default CreateTask