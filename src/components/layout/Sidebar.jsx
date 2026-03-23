import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Target, Bug, DollarSign, FileText } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Targets',   icon: Target,          href: '/targets' },
  { label: 'Vulns',     icon: Bug,             href: '/vulns' },
  { label: 'Earnings',  icon: DollarSign,      href: '/earnings' },
  { label: 'Notes',     icon: FileText,        href: '/notes' },
]

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-white border-r border-slate-200 flex flex-col px-4 py-6">

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
  )
}