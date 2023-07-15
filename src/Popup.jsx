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
      setSelectedMatrix(storedMatrixes[0].id)
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
    <div className='flex flex-col p-5 items-center justify-around w-[300px] h-[200px]'>
      <div className='w-full flex justify-between'>
        <h1 className='font-bold text-xl'>Get it done</h1>
        <button className='border p-1' onClick={handleOpenTab}>Open Matrixes</button>
      </div>
      
      <form onSubmit={(e) => handleSubmit(e)} className='flex items-center flex-col gap-2'>
        <div className='flex justify-around'>
          <input onChange={(e) => setNewTask(e.target.value)} className='border' type="text" />
          <select onChange={handleSelectChange}>
          {matrixes.map((matrix) => (
            <option key={matrix.id} value={matrix.id}>
              {matrix.name}
            </option>
          ))}
          </select>
        </div>
        <button className='w-full border p-1'>Add to Matrix</button>
      </form>
    </div>
  );
};

export default Popup;