import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import Context from './Context/ServerContext.jsx'
import {Provider} from "react-redux"
import { store } from './Redux/storeslice.js'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Context>
      <Provider store={store}>
    <App />
    </Provider>
    </Context>
    </BrowserRouter>
  </StrictMode>,
)
