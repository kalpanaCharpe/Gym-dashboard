import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { DataProvider } from './contexts/DataContext.jsx'
import { NotificationProvider } from './contexts/NotificationContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <DataProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </DataProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
