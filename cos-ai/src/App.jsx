import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import './index.css'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Set the premium landing page as the root route */}
        <Route path="/" element={<MainLayout />} />
      </Routes>
    </Router>
  )
}

export default App