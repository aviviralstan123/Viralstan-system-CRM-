import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import Blogs from './pages/Blogs'
import BlogDetails from './pages/BlogDetails'
import Industries from './pages/Industries'
import Reviews from './pages/Reviews'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
