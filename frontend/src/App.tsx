import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/SuperAdmin/Login/Login'
import Register from './components/SuperAdmin/Register/Register'
import CreateCompany from './components/Company/CreateCompany'
// import Dashboard from './components/SuperAdmin/Dashboard' // Add your dashboard component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/superadmin/login" element={<Login />} />
        <Route path="/superadmin/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
         <Route path="/companies/create" element={<CreateCompany />} />
      </Routes>
    </Router>
  )
}

export default App
