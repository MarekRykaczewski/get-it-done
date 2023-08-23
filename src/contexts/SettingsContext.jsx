import { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    darkMode: false,
    showProgressBars: false
  });

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

  return (
    <SettingsContext.Provider value={{ settings, setSettings, toggleDarkMode, toggleShowProgressBars }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};
