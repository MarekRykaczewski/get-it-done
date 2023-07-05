import { useDrag } from 'react-dnd'

export const ItemTypes = {
  TASK: 'task'
}

const Task = ({ id, children }) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  return (
    <div ref={drag} className={`flex justify-between items-center border ${ isDragging && "opacity-25"} bg-opacity-60 hover:bg-opacity-100 transition border-slate-400 bg-slate-100 rounded-md h-12 w-full px-1`}>
        <div>
        <input type="checkbox" />
            {children}
        </div>
        <div className="flex items-center gap-1">
            <button className="px-3 bg-cyan-500 rounded-md text-white"> Edit </button>
            <button className="px-3 bg-red-500 rounded-md text-white"> Delete </button>
        </div>
    </div>
  )
}

export default Task