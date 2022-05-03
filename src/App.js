import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import './App.css'
import { useAuthContext } from './hooks/useAuthContext'
import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Project from './pages/project/Project'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import OnlineUers from './components/OnlineUers'

function App() {
  const { user, authIsReady } = useAuthContext()
  return (
    <div className='App'>
      {authIsReady && (
        <Router>
          {user && <Sidebar />}

          <div className='container'>
            <Navbar />
            <Routes>
              <Route
                path='/'
                element={user ? <Dashboard /> : <Navigate to='/login' />}
              ></Route>
              <Route
                path='/create'
                element={user ? <Create /> : <Navigate to='/login' />}
              ></Route>
              <Route
                path='/projects/:id'
                element={user ? <Project /> : <Navigate to='/login' />}
              ></Route>
              <Route
                path='/login'
                element={user ? <Navigate to='/' /> : <Login />}
              ></Route>
              <Route
                path='/signup'
                element={user ? <Navigate to='/' /> : <SignUp />}
              ></Route>
            </Routes>
          </div>
          {user && <OnlineUers />}
        </Router>
      )}
    </div>
  )
}

export default App
