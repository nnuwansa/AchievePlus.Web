// src/App.js

import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'                 // <-- Make sure this is not commented out
import Navbar from './pages/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import ProtectedRoute from './pages/ProtectedRoute'
import AuthService from './services/AuthService'
// IMPORTANT: Uncomment and properly import your AnalyticsDashboard:
 import  AdminTaskManagement  from './components/AdminTaskManagement'
 import  EmployeeTaskDashboard  from './components/EmployeeTaskDashboard'
import AnalyticsDashboard from './components/AnalyticsDashboard' // <-- Import here

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const user = await AuthService.getCurrentUser()
        setCurrentUser(user)
      } catch (error) {
        console.error("Not logged in", error)
      } finally {
        setLoading(false)
      }
    }

    checkLoggedIn()
  }, [])

  const handleLogout = async () => {
    try {
      await AuthService.logout()
      setCurrentUser(null)
    } catch (error) {
      console.error("Logout error", error)
    }
  }

  if (loading) {
    return <div className="container mt-5 text-center">Loading...</div>
  }

  return (
    <div className="App">
      <Navbar currentUser={currentUser} handleLogout={handleLogout} />
      <div className="container mt-3">
        <Routes>
          {/* If user goes to root, redirect them to /login */}
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/register" element={<Register />} />

          {/* Admin route */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute 
                isAllowed={currentUser && currentUser.role === 'ADMIN'}
                redirectPath="/login"        // <-- must not point to /admin
              >
                <AdminDashboard user={currentUser} />
              </ProtectedRoute>
            } 
          />

          {/* User route */}
          <Route 
            path="/user" 
            element={
              <ProtectedRoute 
                isAllowed={currentUser && currentUser.role === 'USER'}
                redirectPath="/login"       // <-- must not point to /user
              >
                <UserDashboard user={currentUser} />
              </ProtectedRoute>
            } 
          />

          {/* Analytics route (example for both USER and ADMIN) */}
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute 
                // If you want both USER and ADMIN to access analytics:
                isAllowed={currentUser && (currentUser.role === 'USER' || currentUser.role === 'ADMIN')}
                redirectPath="/login"       // <-- IMPORTANT: do NOT redirect to /analytics
              >
                <AnalyticsDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute 
                // If you want both USER and ADMIN to access analytics:
                isAllowed={currentUser && (currentUser.role === 'USER' || currentUser.role === 'ADMIN')}
                redirectPath="/user"       // <-- IMPORTANT: do NOT redirect to /analytics
              >
                <AnalyticsDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin-tasks" 
            element={
              <ProtectedRoute 
                // If you want both USER and ADMIN to access analytics:
                isAllowed={currentUser && (currentUser.role === 'ADMIN')}
                redirectPath="/admin"      
              >
                <AdminTaskManagement />
              </ProtectedRoute>
            } 
          />

<Route 
            path="/user-tasks" 
            element={
              <ProtectedRoute 
                // If you want both USER and ADMIN to access analytics:
                isAllowed={currentUser && (currentUser.role === 'USER')}
                redirectPath="/user"       
              >
                <EmployeeTaskDashboard/>
              </ProtectedRoute>
            } 
          />

        </Routes>
      </div>
    </div>
  )
}

export default App
