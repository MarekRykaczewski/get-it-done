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
    <nav className="flex flex-col bg-slate-200 h-full w-[300px]">
        <h1 className='text-xl font-bold'> Get it done </h1>
        <CreateMatrix
          matrixes={matrixes}
          setMatrixes={setMatrixes}
         />
        {matrixes.map(matrix => (
          <div onClick={() => setCurrentMatrix(getMatrix(matrix.id))} key={matrix.id} id={matrix.id}> {matrix.name} </div>
       ))}
    </nav>
  )
}

export default Sidebar

