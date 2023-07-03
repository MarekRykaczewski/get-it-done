import { useState } from "react"
import CreateTask from "./CreateTask"

const Matrix = () => {

  const [tasks, setTasks] = useState([])

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className='text-xl font-bold'>Name of matrix</h1>
      <CreateTask 
        tasks={tasks} 
        setTasks={setTasks} 
      />
     <div className='grid auto-cols-min auto-rows-min px-10'>
                
        <div className='relative col-start-1 row-start-1 bg-green-200 w-[400px] h-[400px]'>
        </div>

        <div className='col-start-2 row-start-1 bg-blue-200 w-[400px] h-[400px]'>
        </div>

        <div className='col-start-1 row-start-2 bg-orange-200 w-[400px] h-[400px]'>
        </div>

        <div className='col-start-2 row-start-2 bg-red-200 w-[400px] h-[400px]'>
        </div>

    </div>
  </div>
  )
}

export default Matrix