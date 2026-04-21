import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ReviewHelper from './review_helper.jsx'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get, set, remove } from 'firebase/database'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

window.storage = {
  get: async (key, shared) => {
    if (shared) {
      const snapshot = await get(ref(db, `storage/${key}`))
      if (!snapshot.exists()) return null
      const val = snapshot.val()
      return { value: typeof val === 'string' ? val : JSON.stringify(val) }
    } else {
      const value = localStorage.getItem(`local_${key}`)
      return value ? { value } : null
    }
  },
  set: async (key, value, shared) => {
    if (shared) {
      let parsed
      try { parsed = JSON.parse(value) } catch { parsed = value }
      await set(ref(db, `storage/${key}`), parsed)
    } else {
      localStorage.setItem(`local_${key}`, value)
    }
  },
  delete: async (key, shared) => {
    if (shared) {
      await remove(ref(db, `storage/${key}`))
    } else {
      localStorage.removeItem(`local_${key}`)
    }
  },
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReviewHelper />
  </React.StrictMode>,
)
