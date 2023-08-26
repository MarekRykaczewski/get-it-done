import ReactDOM from 'react-dom'
import { useSettings } from '../contexts/SettingsContext'

const Modal = ({ open, children }) => {

  const { settings } = useSettings()

  if (!open) return null

  return ReactDOM.createPortal (
    <>
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 z-49' />
      <div className={`fixed rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${settings.darkMode ? "bg-slate-800 text-white" : "bg-white text-slate-800"} transition-colors duration-500 p-10 z-50`}>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default Modal