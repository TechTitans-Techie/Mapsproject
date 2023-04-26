import React from 'react'
import Login from './Pages/Login'
import Register from './Pages/Register'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Pages/Home'

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Routes>
    </BrowserRouter>
  )
}

export default App