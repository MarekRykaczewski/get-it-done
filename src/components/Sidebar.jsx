import { useState, useEffect } from "react"
import CreateMatrix from "./CreateMatrix"
import Modal from "./Modal"

const Sidebar = ({ setCurrentMatrix }) => {

  const [matrixes, setMatrixes] = useState([])
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState("")
  const [guideModal, setGuideModal] = useState(false)

  useEffect(() => {
    setMatrixes(JSON.parse(localStorage.getItem("matrixes")) || [])
  }, [])

  const getMatrix = (id) => {
    return matrixes.find(matrix => matrix.id === id)
  }

  const removeMatrix = (id) => {
    const fMatrixes = matrixes.filter(matrix => matrix.id !== id)

    localStorage.setItem("matrixes", JSON.stringify(fMatrixes))
    localStorage.removeItem(id)
    setMatrixes(fMatrixes)
    setCurrentMatrix("")
    
  }

  const editMatrix = (id) => {
    if (title.length > 3) {
      const fMatrixes = matrixes.filter(matrix => matrix.id !== id)
      const fMatrixIndex = matrixes.findIndex(matrix => matrix.id === id)
  
      matrixes[fMatrixIndex].name = title
  
      localStorage.setItem("matrixes", JSON.stringify([...fMatrixes, matrixes[fMatrixIndex]]))
  
      setEditing({})
      setTitle("")
    } else {
      console.log("Title must be at least 3 characters long")
    }

  }

  return (
    <nav className="relative flex flex-col px-20">
        <div className="flex w-full justify-center items-center gap-3">
          <h1 className='mt-10 text-4xl text-center font-logo text-white drop-shadow font-bold mb-10'> GET IT DONE 👔 </h1>
          <button onClick={() => setGuideModal(true)} className='text-3xl text-slate-500 transition rounded-full p-2 hover:bg-slate-200'> 🛈 </button>
          
          <Modal open={guideModal}> 
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-bold'> Use this extension to create Matrices and Tasks. </h1>
            <p> Read more about Eisenhower Matrices <a className='text-blue-500 font-bold underline underline-offset-2 visited:text-purple-500' rel='noreferrer' target='_blank' href='https://en.wikipedia.org/wiki/Time_management#The_Eisenhower_Method'> here </a> </p>
            <h1 className='text-xl font-bold text-center'> TL;DR </h1>
            <p> Organize your Tasks based on the following categories: </p>
            <div className='grid grid-rows-2 grid-cols-2 gap-3 max-w-[500px] max-h-[500px] aspect-square'>
              <div className='bg-green-500 text-white rounded-lg p-6'> 
                <h1 className='text-xl font-bold'> 1. Do first </h1>
                <p> First focus on important tasks that need doing soon </p>
              </div> 
              <div className='bg-blue-500 text-white rounded-lg p-6'> 
                <h1 className='text-xl font-bold'> 2. Schedule </h1>
                <p> Important, but no-so-urgent </p>
              </div> 
              <div className='bg-orange-500 text-white rounded-lg p-6'> 
                <h1 className='text-xl font-bold'> 3. Delegate </h1>
                <p> Urgent, but less important </p>
              </div> 
              <div className='bg-red-500 text-white rounded-lg p-6'> 
                <h1 className='text-xl font-bold'> 4. Delete </h1>
                <p> Neither urgent nor important </p>
              </div> 
            </div>
            <button onClick={() => setGuideModal(false)} className='absolute p-2 top-1 right-1'> ❌ </button>
          </div>
          </Modal>

        </div>
        <CreateMatrix
          matrixes={matrixes}
          setMatrixes={setMatrixes}
        />
        <div className={`border-2 ${!matrixes.length && "hidden"} border-slate-400 xl:max-h-[60vh] rounded-xl flex xl:flex-col xl:mb-0 mb-10 p-6 gap-3 overflow-y-auto bg-slate-200`}>
        {matrixes.map(matrix => (
          <div 
            className="flex items-center justify-between text-lg border-2 min-w-[200px] xl:max-w-full border-slate-400 bg-slate-100 rounded-md h-12 px-1"
            key={matrix.id} 
            id={matrix.id}
          >

            {!editing[matrix.id] ?
            <button 
            className="w-full h-full text-slate-800 pl-2 truncate"
            onClick={() => setCurrentMatrix(getMatrix(matrix.id))}
            >
            {matrix.name}
            </button>
            :
            <div className="w-full flex justify-between">
              <input 
              className="w-full bg-transparent rounded-md px-1" 
              type="text" 
              placeholder={matrix.name} 
              onChange={(e) => setTitle(e.target.value)}
              />
              <button 
              onClick={() => setEditing(false)}
              className="text-xl hover:bg-slate-200 transition p-2 rounded-full"
              > 
              🚫
              </button>
              <button 
              onClick={() => editMatrix(matrix.id)}
              className="text-xl hover:bg-slate-200 transition p-2 rounded-full"
              > 
              💾
              </button>
            </div>
            }

            <button 
              className={`${editing[matrix.id] && "hidden"} text-xl hover:bg-slate-200 transition p-2 rounded-full`} 
              onClick={() => setEditing( { [matrix.id]: true } )}
            >
              ✏️
            </button>
            
            <button 
              className={`${editing[matrix.id] && "hidden"} text-xl hover:bg-slate-200 transition p-2 rounded-full`}
              onClick={() => removeMatrix(matrix.id)}
            >
              🗑️
            </button>
          </div>
        ))}
        </div>
    </nav>
  )
}

export default Sidebar

