// window.global = window;
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import {Store, persistor} from './ruduxStore/Store.js'
import { Toaster } from 'react-hot-toast'
import { PersistGate } from 'redux-persist/integration/react';


createRoot(document.getElementById('root')).render(
  <StrictMode>
  
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
        
          <div>
            <App />
            <Toaster position="top-right" />
          </div>
        
      </PersistGate>
    
  </Provider>
    
  </StrictMode>,
)
