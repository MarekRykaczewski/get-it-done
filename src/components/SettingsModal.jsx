import { useSettings } from "../contexts/SettingsContext"
import Modal from "./Modal"

const SettingsModal = ({ open, onClose }) => {

  const { settings, setSettings, updateGridColor } = useSettings()

  const handleDarkModeChange = (event) => {
    const newSettings = { ...settings, darkMode: event.target.checked };
    setSettings(newSettings);
  };

  const handleShowProgressBarsChange = (event) => {
    const newSettings = { ...settings, showProgressBars: event.target.checked };
    setSettings(newSettings);
  };

  const handleColorChange = (colorKey, newColor) => {
    updateGridColor(colorKey, newColor);
  };

  return (
    <Modal open={open}>

    <h1 className="text-xl font-bold text-gray-500"> Settings </h1>
    <div className="border border-b-2 mb-2 mt-2"/>
    
    <div className="flex gap-3">
      <label htmlFor="show_progress"> Show quadrant progress </label>
      <input 
        id="show_progress" 
        type="checkbox" 
        checked={settings.showProgressBars}
        onChange={handleShowProgressBarsChange}
      />
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
        <input value={settings.gridColors.color1} type="color" onChange={e => handleColorChange('color1', e.target.value)} />
        <input value={settings.gridColors.color2} type="color" onChange={e => handleColorChange('color2', e.target.value)} />
        <input value={settings.gridColors.color3} type="color" onChange={e => handleColorChange('color3', e.target.value)}/>
        <input value={settings.gridColors.color4} type="color" onChange={e => handleColorChange('color4', e.target.value)} />
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