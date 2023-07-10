import { useState } from 'react'
import { useDrag } from 'react-dnd'

export const ItemTypes = {
  TASK: 'task'
}

const Task = ({ currentMatrix, text, tasks, setTasks, id }) => {

  const [editing, setEditing] = useState(false)

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

  return (
    <div ref={drag} className={`flex p-2 justify-between items-center border ${ isDragging && "opacity-25"} bg-opacity-60 hover:shadow-md transition border-slate-400 bg-slate-100 rounded-md h-12 w-full`}>
        <div className='flex gap-1 items-center'>
        <input className={`${editing && "hidden"}`} type="checkbox" />
            <p className={`${editing && "hidden"}`}>{text}</p>
            <input 
              className={`${!editing && "hidden"} w-full shadow-md bg-slate-100 rounded-md mx-2 px-1`} 
              type='text' 
              placeholder={text}
            /> 
        </div>
        <div className="flex items-center gap-1">
            <button 
              className={`${editing && "hidden"} px-3 bg-cyan-500 rounded-md text-white`}
              onClick={() => setEditing(true)}
            >
              Edit 
            </button>
            <button 
              onClick={() => handleRemove(id)} 
              className={`${editing && "hidden"} px-3 bg-red-500 rounded-md text-white`}> 
              Delete 
            </button>
            <button
              onClick={() => setEditing(false)}
              className={`${!editing && "hidden"} px-3 bg-green-500 hover:bg-green-400 transition font-bold rounded-md text-white`}
            >
              Confirm
            </button>
        </div>
    </div>
  )
}

export default Task