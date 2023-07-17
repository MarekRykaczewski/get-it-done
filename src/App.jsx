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
      <div className='flex flex-col xl:flex-row gap-3 items-start bg-slate-400'>
        <div className='w-full xl:w-1/3 bg-slate-300'>
          <Sidebar
            setCurrentMatrix={setCurrentMatrix} 
          />
        </div>
        <div className='w-full xl:w-2/3 h-screen bg-slate-200'> 
          {currentMatrix 
            ? 
            <Matrix
              currentMatrix={currentMatrix}
            />
            : 
            <p> Create a Matrix </p>
          }
        </div>
      </div>
    </TaskProvider>
  </DndProvider>
  )
}

export default App
