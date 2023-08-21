import Task from "./Task"
import { useDrop } from "react-dnd"
import { ItemTypes } from "./Task"
import ProgressBar from "./ProgressBar"


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

  const completeTasks = sectionTasks.filter(task => task.completed == true)

  return (
    <div ref={drop} className={`relative flex flex-col p-6 gap-2 items-center justify-start ${position} ${color} h-full w-full overflow-y-auto`}>
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
    <div className="flex flex-row gap-3 w-full items-center justify-center absolute p-3 bottom-0 right-0">
      <ProgressBar value={completeTasks.length} total={sectionTasks.length} />
      <span className="flex-3 text-center"> {completeTasks.length} / {sectionTasks.length}</span>
    </div>

  </div>
  )
}

export default Section