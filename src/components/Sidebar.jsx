import { useState, useEffect } from "react"
import CreateMatrix from "./CreateMatrix"

const Sidebar = ({ setCurrentMatrix }) => {

  const [matrixes, setMatrixes] = useState([])

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

  return (
    <nav className="flex xl:h-[100vh] min-w-fit w-full flex-col p-6 bg-slate-200">
        <h1 className='text-xl font-bold text-center mb-5'> Get it done </h1>
        <CreateMatrix
          matrixes={matrixes}
          setMatrixes={setMatrixes}
         />
        <div className="flex xl:flex-col flex-wrap p-5 gap-3 max-h-[200px] xl:max-h-full overflow-y-auto">
        {matrixes.map(matrix => (
          <div 
            className="flex items-center justify-between border-2 min-w-[100px] border-slate-400 bg-slate-100 rounded-md h-12 px-1"
            key={matrix.id} 
            id={matrix.id}
          >
            <button 
              className="w-full"
              onClick={() => setCurrentMatrix(getMatrix(matrix.id))}
            >
            {matrix.name}
            </button>
            
            <button 
              className="text-xl hover:bg-slate-200 transition p-2 rounded-full" 
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

