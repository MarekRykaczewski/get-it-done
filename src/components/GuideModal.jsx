import Modal from './Modal'

const GuideModal = ({ open, onClose }) => {
  return (
    <Modal open={open}> 
    <div className='flex flex-col gap-2'>
      <h1 className='text-xl font-bold'> Use this extension to create Matrices and Tasks. </h1>
      <p> Read more about Eisenhower Matrices <a className='text-blue-500 font-bold underline underline-offset-2 visited:text-purple-500' rel='noreferrer' target='_blank' href='https://en.wikipedia.org/wiki/Time_management#The_Eisenhower_Method'> here </a> </p>
      <h1 className='text-xl font-bold text-center'> TL;DR </h1>
      <p> Organize your Tasks based on the following categories: </p>
      <div className='grid grid-rows-2 grid-cols-2 gap-3 max-w-[500px] max-h-[500px] aspect-square'>
        <div className='bg-green-500 text-white rounded-lg p-6'> 
          <h1 className='text-xl font-bold'> 1. Do first </h1>
          <p> First focus on important tasks that need doing soon </p>
        </div> 
        <div className='bg-blue-500 text-white rounded-lg p-6'> 
          <h1 className='text-xl font-bold'> 2. Schedule </h1>
          <p> Important, but no-so-urgent </p>
        </div> 
        <div className='bg-orange-500 text-white rounded-lg p-6'> 
          <h1 className='text-xl font-bold'> 3. Delegate </h1>
          <p> Urgent, but less important </p>
        </div> 
        <div className='bg-red-500 text-white rounded-lg p-6'> 
          <h1 className='text-xl font-bold'> 4. Delete </h1>
          <p> Neither urgent nor important </p>
        </div> 
      </div>
      <button onClick={onClose} className='absolute p-2 top-1 right-1'> ❌ </button>
    </div>
    </Modal>
  )
}

export default GuideModal