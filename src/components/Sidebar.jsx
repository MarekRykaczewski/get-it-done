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

  return (
    <nav className="flex xl:h-[100vh] min-w-fit w-full flex-col p-6 bg-slate-200">
        <h1 className='text-xl font-bold text-center mb-5'> Get it done </h1>
        <CreateMatrix
          matrixes={matrixes}
          setMatrixes={setMatrixes}
         />
        <div className="flex xl:flex-col flex-wrap p-5 gap-3 max-h-[200px] xl:max-h-full overflow-y-auto">
        {matrixes.map(matrix => (
          <button className="border-2 min-w-[100px] border-slate-400 bg-slate-100 rounded-md mr-4 h-12 px-1" onClick={() => setCurrentMatrix(getMatrix(matrix.id))} key={matrix.id} id={matrix.id}> {matrix.name} </button>
        ))}
        </div>
    </nav>
  )
}

export default Sidebar

