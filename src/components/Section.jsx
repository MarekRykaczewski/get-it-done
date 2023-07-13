import Task from "./Task"
import { useDrop } from "react-dnd"
import { ItemTypes } from "./Task"


const Section = ({ currentMatrix, handleRemove, handleEdit, toggleComplete, tasks, setTasks, color, position, category }) => {

  const [{ isOver }, drop] = useDrop(() => ({
      accept: ItemTypes.TASK,
      drop: (item) => addItemToSection(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }))
  
  const addItemToSection = (id) => {
    console.log(category)
    setTasks((prev) => {
      const newTasks = prev.map(task => {
        if (task.id === id) {
          return {...task, category: category}
        }

        return task
      })

      localStorage.setItem(currentMatrix.id, JSON.stringify(newTasks))

      return newTasks
    })
  }

  return (
    <div ref={drop} className={`flex flex-col p-3 gap-2 items-center justify-center ${position} ${color} w-[400px] h-[400px]`}>
    {tasks.map(task => (
      <Task 
        currentMatrix={currentMatrix}
        key={task.id} 
        id={task.id}
        tasks={tasks}
        setTasks={setTasks}
        text={task.name}
        completed={task.completed}
        toggleComplete={toggleComplete}
        handleRemove={handleRemove}
        handleEdit={handleEdit}
      /> 
    ))}
  </div>
  )
}

export default Section