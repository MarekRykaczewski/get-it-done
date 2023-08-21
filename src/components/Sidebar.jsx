import { useState, useEffect } from "react"
import CreateMatrix from "./CreateMatrix"
import SettingsModal from "./SettingsModal"
import GuideModal from "./GuideModal"
import { useSettings } from "../contexts/SettingsContext"

const Sidebar = ({ setCurrentMatrix }) => {

  const [matrixes, setMatrixes] = useState([])
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState("")
  const [guideModal, setGuideModal] = useState(false)
  const [settingsModal, setSettingsModal] = useState(false)
  const { settings } = useSettings()

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
    <nav className={`relative flex flex-col px-20 ${settings.darkMode ? "bg-slate-900" : "bg-slate-300"} transition-colors duration-500 h-full`}>
        <div className="mb-10 mt-10 gap-10 flex w-full justify-center items-center">
          <h1 className='text-4xl self-center text-center font-logo text-white drop-shadow font-bold'> GET IT DONE 👔 </h1>
          
          <div className={`flex w-fit items-center justify-center gap-4 p-6 rounded-xl ${settings.darkMode ? "bg-slate-800" : "bg-slate-100"} transition-colors duration-500`}>
            <button onClick={() => setGuideModal(true)} className='text-3xl text-slate-500 transition rounded-full align-middle'> 🛈 </button>
            <GuideModal open={guideModal} onClose={() => setGuideModal(!guideModal)} />
          
            <button onClick={() => setSettingsModal(true)} className='text-3xl text-slate-500 transition rounded-full align-middle'> ⚙️ </button>
            <SettingsModal open={settingsModal} onClose={() => setSettingsModal(!settingsModal)} />
          </div>
          

        </div>
        <CreateMatrix
          matrixes={matrixes}
          setMatrixes={setMatrixes}
        />
        <div className={`border-2 ${!matrixes.length && "hidden"} border-slate-400 xl:max-h-[60vh] rounded-xl flex xl:flex-col xl:mb-0 mb-10 p-6 gap-3 overflow-y-auto ${settings.darkMode ? "bg-slate-800" : "bg-slate-200"} transition-colors duration-500`}>
        {matrixes.map(matrix => (
          <div 
            className={`flex items-center justify-between text-lg border-2 min-w-[200px] xl:max-w-full border-slate-400 ${settings.darkMode ? "bg-slate-500 text-white" : "bg-slate-100"} transition-colors duration-500 rounded-md h-12 px-1`}
            key={matrix.id} 
            id={matrix.id}
          >

            {!editing[matrix.id] ?
            <button 
            className={`w-full h-full ${settings.darkMode ? "text-white" : "text-slate-800"} transition-colors duration-500 pl-2 truncate`}
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

