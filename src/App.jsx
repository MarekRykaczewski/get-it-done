import Matrix from './components/Matrix'
import Sidebar from './components/Sidebar'
import './index.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {

  return (
    <DndProvider backend={HTML5Backend}>  
    <div className='flex w-[100%] h-[100vh] items-center justify-between'>
      <Sidebar />
      <div className='flex flex-col mr-auto ml-auto gap-3 items-center justify-center'>
        <Matrix />
      </div>
    </div>
    </DndProvider> 
  )
}

export default App
