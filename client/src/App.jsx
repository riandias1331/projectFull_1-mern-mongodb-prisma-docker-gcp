import { Routes, Route } from 'react-router-dom'
import LoginSignup from './components/login/loginsignup'
import Home from './components/home/home'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginSignup />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App