import { useEffect, useState } from "react"
import CreateTask from "./CreateTask"
import Section from "./Section"

const Matrix = ({ currentMatrix }) => {

  const [tasks, setTasks] = useState([])
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTasks = tasks.filter((task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    if (showSearchBar) {
      setSearchQuery(""); // Reset the search query when closing the search bar
    }
  };

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem(currentMatrix.id)) || [])
  }, [currentMatrix.id])

  const positionMap = {
    do: { col: 1, row: 1, color: 'bg-green-300' },
    decide: { col: 2, row: 1, color: 'bg-blue-300' },
    delegate: { col: 1, row: 2, color: 'bg-orange-300' },
    delete: { col: 2, row: 2, color: 'bg-red-300' },
  };

  return (  
    <div className="flex flex-col items-center justify-center gap-5 py-5 px-10 h-full">
      <h1 className='text-3xl font-bold text-slate-500 max-w-[800px] drop-shadow'> {currentMatrix.name}</h1>
      
      <div className="flex gap-4 items-center">
        <CreateTask 
          currentMatrix={currentMatrix}
          setTasks={setTasks} 
        />
        <button
        className={`${!showSearchBar ? "bg-blue-500" : "bg-red-500"} transition text-md text-lg rounded-md w-44 px-4 h-12 text-white`}
        onClick={toggleSearchBar}
        >
        {!showSearchBar ? "Search Tasks" : "Close Search"}
        </button>
      </div>

    {showSearchBar && (
      <div className="fixed top-5 right-5 z-10">
        <input
          type="text"
          placeholder="Search tasks..."
          className="border-2 border-slate-400 text-lg bg-slate-100 rounded-md mr-4 pl-2 h-12 w-64 px-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    )}
     <div className='grid grid-rows-2 grid-cols-2 h-full w-full aspect-square'>
                
     {Object.keys(positionMap).map((category) => {
      const { col, row, color } = positionMap[category];
      const sectionTasks = filteredTasks.filter((task) => task.category === category);

      return (
        <Section
          key={`${category}_${currentMatrix.id}`}
          currentMatrix={currentMatrix}
          tasks={tasks}
          setTasks={setTasks}
          sectionTasks={sectionTasks}
          position={`col-start-${col} row-start-${row}`}
          color={color}
          category={category}
        />
      );
    })}
        
    </div>
  </div>
  )
}

export default Matrix