import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'
import Targets from './pages/Targets'
import Vulns from './pages/Vulns'
import Earnings from './pages/Earnings'
import Notes from './pages/Notes'

export default function App() {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <main className="ml-60 flex-1 p-8">
        <Routes>
          <Route path="/"         element={<Dashboard />} />
          <Route path="/targets"  element={<Targets />} />
          <Route path="/vulns"    element={<Vulns />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/notes"    element={<Notes />} />
        </Routes>
      </main>
    </div>
  )
}