import { useState } from 'react'
import Matrix from './components/Matrix'
import Sidebar from './components/Sidebar'
import './index.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TaskProvider } from './contexts/TaskContext'
import { SettingsProvider } from './contexts/SettingsContext';

function App() {

  const [currentMatrix, setCurrentMatrix] = useState("")

  return (
  <DndProvider backend={HTML5Backend}>
    <SettingsProvider>
      <TaskProvider>
        <div className='flex flex-col xl:flex-row w-screen h-screen'>
        <div className='relative w-full xl:w-1/3'>
          <Sidebar
            setCurrentMatrix={setCurrentMatrix} 
          />
        </div>
        <div className='relative w-full xl:w-2/3'> 
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
    </SettingsProvider>
  </DndProvider>
  )
}

export default App
