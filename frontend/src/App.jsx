import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Register from './Components/Register'
import Login from './Components/Login'
import Home from './Components/Home'

function App() {
  return (
    <Router>
      <div className='App'>
        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
