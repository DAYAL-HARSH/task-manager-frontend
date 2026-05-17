import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/AuthContext'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import './App.css'
import './index.css'

const ProtectedRoute = ({ children }) => {
  const { token, authLoading } = useAuth()
  if (authLoading) return null
  return token ? children : <Navigate to='/login' replace />
}

const PublicRoute = ({ children }) => {
  const { token, authLoading } = useAuth()
  if (authLoading) return null
  return token ? <Navigate to='/dashboard' replace /> : children
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen w-full selection:bg-cyan-500/30">
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route
              path='/login'
              element={<PublicRoute><Login /></PublicRoute>}
            />
            <Route
              path='/register'
              element={<PublicRoute><Register /></PublicRoute>}
            />
            <Route
              path='/dashboard'
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
            />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App