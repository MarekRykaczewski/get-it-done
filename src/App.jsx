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
    <div className='flex w-[100%] h-[100vh] items-center justify-between'>
      <Sidebar
        setCurrentMatrix={setCurrentMatrix} 
      />
      <div className='flex flex-col mr-auto ml-auto gap-3 items-center justify-center'>
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
