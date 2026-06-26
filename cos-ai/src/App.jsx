import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadUser } from './features/auth/slices/authSlice'

// Pages
import MainLayout   from './layouts/MainLayout'
import SignInPage   from './pages/SignInPage'
import DasboardPage from './pages/DasboardPage'

// Route guard
import PrivateRoute from './components/routing/PrivateRoute'

import './index.css'

/**
 * AppRoutes sits inside Redux Provider (in main.jsx) so it can dispatch.
 * On first mount it silently attempts to restore the session via httpOnly cookie.
 */
const AppRoutes = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/"       element={<MainLayout />} />
      <Route path="/signin" element={<SignInPage />} />

      {/* Protected routes — wrapped in PrivateRoute */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DasboardPage />} />
      </Route>
    </Routes>
  )
}

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
)

export default App