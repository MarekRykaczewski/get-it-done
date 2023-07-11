import { useState, useEffect } from "react"
import CreateMatrix from "./CreateMatrix"

const Sidebar = ({ setCurrentMatrix }) => {

  const [matrixes, setMatrixes] = useState([])
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState("")

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
      localStorage.setItem(id, JSON.stringify([matrixes[fMatrixIndex]]))
  
      setEditing({})
      setTitle("")
    } else {
      console.log("Title must be at least 3 characters long")
    }

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
            className="flex items-center justify-between border-2 min-w-[200px] border-slate-400 bg-slate-100 rounded-md h-12 px-1"
            key={matrix.id} 
            id={matrix.id}
          >

            {!editing[matrix.id] ?
            <button 
            className="w-full px-3"
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

