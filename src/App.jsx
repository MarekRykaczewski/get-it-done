import Matrix from './components/Matrix'
import Sidebar from './components/Sidebar'
import './index.css'

function App() {

  return (
    <div className='flex w-[100%] h-[100vh] items-center justify-between'>
      <Sidebar />
      <div className='flex flex-col mr-auto ml-auto gap-3 items-center justify-center'>
        <Matrix />
      </div>
    </div>
  )
}

export default App
