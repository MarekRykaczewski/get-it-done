import { useSettings } from "../contexts/SettingsContext"
import Modal from "./Modal"

const SettingsModal = ({ open, onClose }) => {

  const { settings, setSettings } = useSettings()

  const handleDarkModeChange = (event) => {
    const newSettings = { ...settings, darkMode: event.target.checked };
    setSettings(newSettings);
  };

  return (
    <Modal open={open}>

    <h1 className="text-xl font-bold text-gray-500"> Settings </h1>
    <div className="border border-b-2 mb-2 mt-2"/>
    
    <div className="flex gap-3">
      <label htmlFor="show_progress"> Show quadrant progress </label>
      <input id="show_progress" type="checkbox" />
    </div>
    
    <h1 className="text-xl font-bold text-gray-500 mb-2 mt-2"> Theme </h1>
    
    <div className="flex gap-3">
      <label htmlFor="dark_mode"> Dark Mode </label>
      <input 
        id="dark_mode" 
        type="checkbox" 
        checked={settings.darkMode}
        onChange={handleDarkModeChange}
      />
    </div>

    <div className="flex gap-3 items-center">
      <label htmlFor="show_progress"> Quadrant Colors </label>
      <div className="grid grid-cols-2">
        <input value={"#86efac"} type="color" />
        <input value={"#93c5fd"} type="color" />
        <input value={"#fdba74"} type="color" />
        <input value={"#fca5a5"} type="color" />
      </div>
    </div>
    
    <button 
			onClick={onClose} 
			className='absolute p-2 top-1 right-1'
    > 
    ❌ 
    </button>
  </Modal>
  )
}

export default SettingsModal