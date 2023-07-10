import { useState } from 'react'
import Matrix from './components/Matrix'
import Sidebar from './components/Sidebar'
import './index.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {

  const [currentMatrix, setCurrentMatrix] = useState("")

  return (
  <DndProvider backend={HTML5Backend}>  
    <div className='flex flex-col xl:flex-row h-screen gap-3 items-center justify-between'>
      <div className='w-full xl:w-1/3'>
        <Sidebar
          setCurrentMatrix={setCurrentMatrix} 
        />
      </div>
      <div className='w-full xl:w-2/3'> 
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
  </DndProvider>
  )
}

export default App
