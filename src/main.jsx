// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'core-js/features/promise'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
    <App />
)
