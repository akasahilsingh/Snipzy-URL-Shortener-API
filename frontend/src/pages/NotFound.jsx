import { Link } from 'react-router-dom'
import { Zap, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <p className="text-6xl font-bold text-stone-200 mb-4 select-none">404</p>
        <h1 className="text-lg font-semibold text-stone-800 mb-1">Page not found</h1>
        <p className="text-sm text-stone-400 mb-7">
          The page you're looking for doesn't exist or was moved.
        </p>
        <Link to="/" className="btn-primary">
          <ArrowLeft size={14} /> Go home
        </Link>
      </div>
    </div>
  )
}
