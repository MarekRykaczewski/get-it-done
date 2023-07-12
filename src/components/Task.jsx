import { useEffect, useState } from 'react'
import { useDrag } from 'react-dnd'

export const ItemTypes = {
  TASK: 'task'
}

const Task = ({ currentMatrix, text, completed, tasks, setTasks, id }) => {

  const [editing, setEditing] = useState({})
  const [task, setTask] = useState({})
  const [title, setTitle] = useState("")

  useEffect(() => {
    const fTask = tasks.filter(task => task.id === id)
    setTask(...fTask)
  }, [])

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const handleRemove = (id) => {
    const fTasks = tasks.filter(task => task.id !== id)

    localStorage.setItem(currentMatrix.id, JSON.stringify(fTasks))

    setTasks(fTasks)
  }

  const handleEdit = () => {
    task.name = title

    const fTasks = tasks.filter(task => task.id !== id)
    const newTasks = [...fTasks, task]

    setTasks(newTasks)
    localStorage.setItem(currentMatrix.id, JSON.stringify(tasks))
    setEditing(false)
  }

  return (
    <div ref={drag} className={`${completed && "bg-red-500"} flex p-2 justify-between items-center border ${ isDragging && "opacity-25"} bg-opacity-60 hover:shadow-md transition border-slate-400 bg-slate-100 rounded-md h-12 w-full`}>
        <div className='flex gap-1 items-center'>
        <input 
          className={`${editing[task.id] && "hidden"}`} 
          type="checkbox" 
          checked={task.completed}
        />
            <p className={`${editing[task.id] && "hidden"}`}>{text}</p>
            <input 
              className={`${!editing[task.id] && "hidden"} w-full shadow-md bg-slate-100 rounded-md mx-2 px-1`} 
              type='text' 
              placeholder={text}
              onChange={(e) => setTitle(e.target.value)}
            /> 
        </div>
        <div className="flex items-center gap-1">
            <button 
              className={`${editing[task.id] && "hidden"} px-3 bg-cyan-500 rounded-md text-white`}
              onClick={() => setEditing({ [id]: true })}
            >
              Edit 
            </button>
            <button 
              onClick={() => handleRemove(id)} 
              className={`${editing[task.id] && "hidden"} px-3 bg-red-500 rounded-md text-white`}> 
              Delete 
            </button>
            <button
              onClick={() => handleEdit()}
              className={`${!editing[task.id] && "hidden"} px-3 bg-green-500 hover:bg-green-400 transition font-bold rounded-md text-white`}
            >
              Confirm
            </button>
        </div>
    </div>
  )
}

export default Task