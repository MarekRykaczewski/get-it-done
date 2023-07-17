import { useContext, useEffect, useState } from 'react'
import { useDrag } from 'react-dnd'
import { TaskContext } from '../contexts/TaskContext'

export const ItemTypes = {
  TASK: 'task'
}

const Task = ({ currentMatrix, text, completed, tasks, setTasks, id }) => {

  const [editing, setEditing] = useState({})
  const [task, setTask] = useState({})
  const [name, setName] = useState("")

  const { toggleComplete, removeTask, editTask } = useContext(TaskContext);

  useEffect(() => {
    const fTask = tasks.filter(task => task.id === id)
    setTask(...fTask)
  }, [tasks, id])

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const handleToggleComplete = (taskId, matrixId) => {
    toggleComplete(taskId, matrixId, setTasks, tasks);
  };

  const handleRemoveTask = (taskId, matrixId) => {
    removeTask(taskId, matrixId, setTasks, tasks)
  }

  const handleEditTask = (id, matrixId, updatedName) => {
    editTask(id, matrixId, updatedName, setTasks, tasks)
    setEditing(false);
  }

  return (
    <div ref={drag} className={`${completed && "bg-red-500"} ${task.completed && "opacity-30"} flex p-2 justify-between items-center border ${ isDragging && "opacity-25"} bg-opacity-60 hover:shadow-md transition border-slate-400 bg-slate-100 rounded-md h-12 w-full`}>
        <div className='flex gap-1 items-center'>
        <input 
          className={`${editing[task.id] && "hidden"}`} 
          type="checkbox" 
          onChange={() => handleToggleComplete(id, currentMatrix.id)}
        />
            <p className={`${editing[task.id] && "hidden"} ${task.completed && "line-through"}`}>{text}</p>
            <input 
              className={`${!editing[task.id] && "hidden"} w-full shadow-md bg-slate-100 rounded-md mx-2 px-1`} 
              type='text' 
              placeholder={text}
              onChange={(e) => setName(e.target.value)}
            /> 
        </div>
        <div className="flex items-center gap-1">
            <button 
              className={`${editing[task.id] && "hidden"} text-xl hover:bg-slate-200 transition p-2 rounded-full`}
              onClick={() => setEditing({ [id]: true })}
            >
              ✏️ 
            </button>
            <button 
              onClick={() => handleRemoveTask(id, currentMatrix.id)} 
              className={`${editing[task.id] && "hidden"} text-xl hover:bg-slate-200 transition p-2 rounded-full`}> 
              🗑️
            </button>
            <button
              onClick={() => setEditing(false)}
              className={`${!editing[task.id] && "hidden"} text-xl hover:bg-slate-200 transition p-2 rounded-full`}
            >
              🚫
            </button>
            <button
              onClick={() => handleEditTask(id, currentMatrix.id, name)}
              className={`${!editing[task.id] && "hidden"} text-xl hover:bg-slate-200 transition p-2 rounded-full`}
            >
              💾
            </button>
        </div>
    </div>
  )
}

export default Task