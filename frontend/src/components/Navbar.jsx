import { Link, useNavigate } from 'react-router-dom'
import { Zap, LogOut, BarChart2 } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('snipzy_token')
    localStorage.removeItem('snipzy_user')
    navigate('/login')
  }

  const user = JSON.parse(localStorage.getItem('snipzy_user') || '{}')

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center shadow-sm group-hover:bg-brand-700 transition-colors">
            <Zap size={14} className="text-white" />
          </span>
          <span className="text-sm font-semibold text-stone-900 tracking-tight">Snipzy</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {user?.email && (
            <span className="hidden sm:block text-xs text-stone-400">
              {user.email}
            </span>
          )}
          <button
            id="btn-logout"
            onClick={handleLogout}
            className="btn-ghost text-xs px-3 py-1.5"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
