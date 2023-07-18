import Task from "./Task"
import { useDrop } from "react-dnd"
import { ItemTypes } from "./Task"


const Section = ({ currentMatrix, sectionTasks, tasks, setTasks, color, position, category }) => {

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
    <div ref={drop} className={`flex flex-col p-3 gap-2 items-center justify-center ${position} ${color} w-full h-full `}>
    {sectionTasks.map(task => (
      <Task 
        currentMatrix={currentMatrix}
        key={task.id} 
        id={task.id}
        tasks={tasks}
        setTasks={setTasks}
        text={task.name}
        completed={task.completed}
      /> 
    ))}
  </div>
  )
}

export default Section