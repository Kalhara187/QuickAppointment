import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components'
import HomePage from './pages/HomePage.jsx'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App