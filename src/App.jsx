import { useState } from 'react'
import Matrix from './components/Matrix'
import Sidebar from './components/Sidebar'
import './index.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TaskProvider } from './contexts/TaskContext'

function App() {

  const [currentMatrix, setCurrentMatrix] = useState("")

  return (
  <DndProvider backend={HTML5Backend}>  
    <TaskProvider>
      <div className='flex flex-col xl:flex-row w-screen h-screen gap-3 bg-slate-400'>
        <div className='relative w-full xl:w-1/3 bg-slate-300'>
          <Sidebar
            setCurrentMatrix={setCurrentMatrix} 
          />
        </div>
        <div className='relative w-full xl:w-2/3 bg-slate-200'> 
          {currentMatrix 
            ? 
            <Matrix
              currentMatrix={currentMatrix}
            />
            : 
            <div className='flex w-full h-screen items-center justify-center'> 
             <h1 className='text-2xl text-slate-600 font-bold'> Click on a Matrix or create a new one </h1>
            </div>
          }
        </div>
      </div>
    </TaskProvider>
  </DndProvider>
  )
}

export default App
