import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const CreateMatrix = ({ matrixes, setMatrixes }) => {

  const MATRIX_TEMPLATE = {
    id: "",
    name: ""
  }

  const [matrix, setMatrix] = useState(MATRIX_TEMPLATE)

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(matrix)

    if (matrix.name.length < 3) {
      console.log("Matrix name must be at least 3 characters long")
    } else {

      setMatrixes((prev) => {
        const list = [...prev, matrix]
  
        localStorage.setItem("matrixes", JSON.stringify(list))
  
        return list
      })
  
      setMatrix(MATRIX_TEMPLATE)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
      type="text" 
      className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
      value={matrix.name}
      onChange={(e) => setMatrix({...matrix, id: uuidv4(), name: e.target.value})} 
      />
      <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">
        Create
      </button>
    </form>  
  )
}

export default CreateMatrix