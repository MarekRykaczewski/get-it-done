import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.css'

const Popup = () => {
  const [matrixes, setMatrixes] = useState([]);
  const [selectedMatrix, setSelectedMatrix] = useState("")
  const [newTask, setNewTask] = useState("")

  useEffect(() => {
    const storedMatrixes = JSON.parse(localStorage.getItem('matrixes'));
    if (storedMatrixes) {
      setMatrixes(storedMatrixes);
      if (storedMatrixes.length > 0) {
        setSelectedMatrix(storedMatrixes[0].id);
      }
    }
  }, []);

  const handleSelectChange = (e) => {
    setSelectedMatrix(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const tasks = JSON.parse(localStorage.getItem(selectedMatrix)) || [];

    const newTaskObject = {
      id: uuidv4(),
      name: newTask,
      completed: false,
      category: "do"
    };

    const updatedTasks = [...tasks, newTaskObject];
    localStorage.setItem(selectedMatrix, JSON.stringify(updatedTasks));
  }

  const handleOpenTab = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('index.html') });
  };

  return (
    <div className='flex flex-col p-5 items-center justify-around w-[300px] h-[200px] bg-slate-300'>
      <div className='w-full flex flex-col gap-3 items-center justify-between'>
        <h1 className='font-logo font-bold text-white drop-shadow text-3xl'>GET IT DONE 👔</h1>
        <button className='bg-cyan-500 rounded-md px-4 py-1 text-white' onClick={handleOpenTab}>Open Matrixes</button>
      </div>
      
        {matrixes.length > 0 && <form onSubmit={(e) => handleSubmit(e)} className='flex items-center flex-col gap-2'>
        <div className='flex gap-2 justify-around'>
          <input placeholder='Add a new task' onChange={(e) => setNewTask(e.target.value)} className='border-2 w-full border-slate-400 bg-slate-100 rounded-md py-1 pl-2 px-1' type="text" />
          <select onChange={handleSelectChange}>
          {matrixes.map((matrix) => (
            <option key={matrix.id} value={matrix.id}>
              {matrix.name}
            </option>
          ))}
          </select>
        </div>
        <button className='w-full bg-cyan-500 rounded-md px-4 py-1 text-white'>Add to Matrix</button>
      </form>}
    </div>
  );
};

export default Popup;