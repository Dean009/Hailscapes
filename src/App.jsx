import { HashRouter, Route, Routes } from 'react-router-dom'
import SiteNavbar from './components/SiteNavbar'
import AlbumPage from './pages/AlbumPage'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'

function App() {
  return (
    <HashRouter>
      <div>
        <SiteNavbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/album" element={<AlbumPage />} />
        </Routes>

        <footer className="bg-dark text-white py-4 mt-5">
          <div className="container text-center">
            <p className="mb-0">&copy; 2026 Hail Landscapes. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  )
}

export default App
