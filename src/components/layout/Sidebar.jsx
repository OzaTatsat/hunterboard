import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Target, Bug, DollarSign, FileText, Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Targets',   icon: Target,          href: '/targets' },
  { label: 'Vulns',     icon: Bug,             href: '/vulns' },
  { label: 'Earnings',  icon: DollarSign,      href: '/earnings' },
  { label: 'Notes',     icon: FileText,        href: '/notes' },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-base font-semibold text-slate-900">🎯 HunterBoard</h1>
        <button onClick={() => setOpen(!open)} className="text-slate-600">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-screen w-60 bg-white border-r border-slate-200 flex flex-col px-4 py-6 z-50
        transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="mb-8 px-2">
          <h1 className="text-lg font-semibold text-slate-900">🎯 HunterBoard</h1>
          <p className="text-xs text-slate-400 mt-0.5">Bug Bounty Tracker</p>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition duration-200 ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}