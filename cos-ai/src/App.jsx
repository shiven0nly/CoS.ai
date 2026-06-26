import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import DasboardPage from './pages/DasboardPage'
import './index.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/dashboard" element={<DasboardPage />} />
      </Routes>
    </Router>
  )
}

export default App