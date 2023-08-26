import React from 'react'
import ReactDOM from 'react-dom/client'
import Popup from './Popup.jsx'
import { SettingsProvider } from './contexts/SettingsContext';

ReactDOM.createRoot(document.getElementById('popup-root')).render(
  <React.StrictMode>
    <SettingsProvider>
      <Popup />
    </SettingsProvider>
  </React.StrictMode>,
)
