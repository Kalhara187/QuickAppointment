import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Quick Appointment</h1>
        </header>
        <main className="app-main">
          <Routes>
            {/* Add your routes here */}
            <Route path="/" element={<div>Welcome to Quick Appointment</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
