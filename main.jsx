import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ReviewHelper from './review_helper.jsx'

// Mock window.storage using localStorage
window.storage = {
  get: async (key, shared) => {
    const storageKey = shared ? `shared_${key}` : `local_${key}`
    const value = localStorage.getItem(storageKey)
    return value ? { value } : null
  },
  set: async (key, value, shared) => {
    const storageKey = shared ? `shared_${key}` : `local_${key}`
    localStorage.setItem(storageKey, value)
  },
  delete: async (key, shared) => {
    const storageKey = shared ? `shared_${key}` : `local_${key}`
    localStorage.removeItem(storageKey)
  },
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReviewHelper />
  </React.StrictMode>,
)
