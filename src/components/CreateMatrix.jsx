import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { useSettings } from "../contexts/SettingsContext";

const CreateMatrix = ({ matrixes, setMatrixes }) => {

  const { settings } = useSettings()

  const MATRIX_TEMPLATE = {
    id: uuidv4(),
    name: "",
  }

  const [matrix, setMatrix] = useState(MATRIX_TEMPLATE)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (matrix.name.length < 3) {
      console.log("Matrix name must be at least 3 characters long")
      return
    } 

    const updatedMatrix = { ...matrix, id: uuidv4() };
    const updatedMatrixes = [...matrixes, updatedMatrix];

    setMatrixes(updatedMatrixes);
    localStorage.setItem("matrixes", JSON.stringify(updatedMatrixes));

    setMatrix(MATRIX_TEMPLATE)
  }

  const handleMatrixNameChange = (e) => {
    setMatrix({ ...matrix, name: e.target.value });
  };

  return (
    <form className="flex self-center mb-10" onSubmit={handleSubmit}>
      <input 
      type="text" 
      className={`border-2 border-slate-400 text-lg ${settings.darkMode ? "bg-slate-500 text-white placeholder:text-white" : "bg-slate-100"} transition-colors duration-500 rounded-md mr-4 pl-2 h-12 w-64 px-1`}
      value={matrix.name}
      onChange={handleMatrixNameChange} 
      placeholder="Create a new Matrix..."
      />
      <button className="bg-cyan-500 text-lg rounded-md px-4 h-12 text-white">
        Create
      </button>
    </form>  
  )
}

export default CreateMatrix