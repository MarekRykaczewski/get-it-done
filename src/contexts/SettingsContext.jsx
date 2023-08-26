import { createContext, useContext, useEffect, useState } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const storedSettings = localStorage.getItem('appSettings');
    return storedSettings ? JSON.parse(storedSettings) : {
      darkMode: false,
      showProgressBars: false,
      gridColors: {
        color1: '#86efac', // Green
        color2: '#93c5fd', // Blue
        color3: '#fdba74', // Orange
        color4: '#fca5a5', // Red
      },
    };
  });

  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [settings]);

  const toggleDarkMode = () => {
    setSettings(prevSettings => ({
      ...prevSettings,
      darkMode: !prevSettings.darkMode,
    }));
  };

  const toggleShowProgressBars = () => {
    setSettings(prevSettings => ({
      ...prevSettings,
      showProgressBars: !prevSettings.showProgressBars,
    }));
  };

  const updateGridColor = (colorKey, newColor) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      gridColors: {
        ...prevSettings.gridColors,
        [colorKey]: newColor,
      },
    }));
  };

  return (
    <SettingsContext.Provider 
    value={{ 
      settings, 
      setSettings, 
      toggleDarkMode, 
      toggleShowProgressBars,
      updateGridColor 
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};
