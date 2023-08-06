import { useContext, useEffect, useState } from 'react'
import { useDrag } from 'react-dnd'
import { TaskContext } from '../contexts/TaskContext'
import Modal from './Modal'

export const ItemTypes = {
  TASK: 'task'
}

const Task = ({ currentMatrix, text, completed, tasks, setTasks, id }) => {

  const [editing, setEditing] = useState({})
  const [task, setTask] = useState({})
  const [name, setName] = useState("")

  const [reminderModal, setReminderModal] = useState(false)
  const [reminderDateTime, setReminderDateTime] = useState('');
  const [reminderDescription, setReminderDescription] = useState('test');

  const { toggleComplete, removeTask, editTask } = useContext(TaskContext);

  useEffect(() => {
    const fTask = tasks.filter(task => task.id === id)
    setTask(...fTask)
  }, [tasks, id])

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const handleToggleComplete = (taskId, matrixId) => {
    toggleComplete(taskId, matrixId, setTasks, tasks);
  };

  const handleRemoveTask = (taskId, matrixId) => {
    removeTask(taskId, matrixId, setTasks, tasks)
  }

  const handleEditTask = (id, matrixId, updatedName) => {
    editTask(id, matrixId, updatedName, setTasks, tasks)
    setEditing(false);
  }

  const saveReminder = () => {
    if (!('Notification' in window)) {
      alert('Notifications are not supported by your browser.');
      return;
    }

    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          scheduleReminder();
        } else {
          alert('Please grant permission to display notifications.');
        }
      });
    } else {
      scheduleReminder();
    }
  };

  const scheduleReminder = () => {
    if (!reminderDateTime || !reminderDescription) {
      alert('Please select a valid date and time and provide a description for the reminder.');
      return;
    }

    if ('serviceWorker' in navigator && 'MessageChannel' in window) {
      navigator.serviceWorker.ready.then((registration) => {
        const channel = new MessageChannel();
        channel.port1.onmessage = (event) => {
          // Handle the response from the Service Worker, if needed
          console.log('Response from Service Worker:', event.data);
        };

        // Send reminder data to the Service Worker with the correct format
        registration.active.postMessage(
          {
            type: 'scheduleReminder',
            date: new Date(reminderDateTime).toISOString(), // Convert the date to ISO string
            description: reminderDescription,
          },
          [channel.port2]
        );
      });
    } else {
      console.log('Service Worker or MessageChannel is not supported.');
    }
  };

  return (
    <div ref={drag} className={`${completed && "bg-red-500"} ${task.completed && "opacity-30"} flex p-2 justify-between items-center border ${ isDragging && "opacity-25"} bg-opacity-80 hover:shadow-md transition border-slate-400 bg-slate-100 rounded-md h-12 w-full`}>
        <div className='flex justify-around gap-1 w-full items-center text-slate-800'>
            <input 
              className={`mr-auto ${editing[task.id] && "hidden"}`} 
              type="checkbox" 
              onChange={() => handleToggleComplete(id, currentMatrix.id)}
            />
            <p className={`mr-auto text-lg text-ellipsis overflow-hidden ${editing[task.id] && "hidden"} ${task.completed && "line-through"}`}>{text}</p>
            <input 
              className={`${!editing[task.id] && "hidden"} w-full shadow-md bg-slate-100 rounded-md mx-2 px-1`} 
              type='text' 
              placeholder={text}
              onChange={(e) => setName(e.target.value)}
            /> 
            <div className='flex'>
              <button 
                className={`${editing[task.id] && "hidden"} text-xl hover:bg-slate-200 transition p-2 rounded-full`}
                onClick={() => setEditing({ [id]: true })}
              >
                ✏️ 
              </button>
              <button 
                className={`${editing[task.id] && "hidden"} relative text-xl hover:bg-slate-200 transition p-2 rounded-full`}
                onClick={() => setReminderModal(true)}
              >
                🗓️
              </button>
              <Modal open={reminderModal}>
                <div className='flex flex-col gap-3 mb-3'>
                  <h1 className='font-bold text-center text-2xl'>Set a reminder</h1>
                  <input 
                    className='border rounded-lg border-black p-1' 
                    type="datetime-local" 
                    value={reminderDateTime}
                    onChange={(e) => setReminderDateTime(e.target.value)}
                  />
                  <div className='flex w-full justify-around'>
                    <button className='bg-cyan-500 text-md text-lg rounded-md px-4 h-12 text-white' onClick={() => saveReminder()}>Confirm</button>
                    <button className='bg-red-500 text-md text-lg rounded-md px-4 h-12 text-white' onClick={() => setReminderModal(false)}>Cancel</button>
                  </div>
                </div>
              </Modal>
              <button 
                onClick={() => handleRemoveTask(id, currentMatrix.id)} 
                className={`${editing[task.id] && "hidden"} text-xl hover:bg-slate-200 transition p-2 rounded-full`}> 
                🗑️
              </button>
              <button
                onClick={() => setEditing(false)}
                className={`${!editing[task.id] && "hidden"} text-xl hover:bg-slate-200 transition p-2 rounded-full`}
              >
                🚫
              </button>
              <button
                onClick={() => handleEditTask(id, currentMatrix.id, name)}
                className={`${!editing[task.id] && "hidden"} text-xl hover:bg-slate-200 transition p-2 rounded-full`}
              >
                💾
              </button>
            </div>
        </div>
    </div>
  )
}

export default Task