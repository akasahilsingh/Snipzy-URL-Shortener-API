import { useState, useEffect } from 'react'
import { Link2, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import LinkCard from '../components/LinkCard'
import axios from 'axios'

const API_BASE = 'http://localhost:8000'

export default function Dashboard() {
  const [url, setUrl] = useState('')
  const [links, setLinks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('snipzy_links') || '[]')
    } catch {
      return []
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const persistLinks = (updated) => {
    setLinks(updated)
    localStorage.setItem('snipzy_links', JSON.stringify(updated))
  }

  const handleShorten = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const trimmed = url.trim()
    if (!trimmed) {
      setError('Please enter a URL.')
      return
    }

    // Basic URL check
    try {
      new URL(trimmed)
    } catch {
      setError('Please enter a valid URL (include https://).')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Failed to shorten URL.')
        return
      }

      const newLink = { shortId: data.shortId, url: trimmed, createdAt: new Date().toISOString() }
      persistLinks([newLink, ...links])
      setUrl('')
      setSuccess(`Shortened: ${API_BASE}/${data.shortId}`)
    } catch (err) {
      setError('Could not reach the server. Make sure it is running on localhost:8000.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
        {/* Hero heading */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-stone-900">Shorten a link</h2>
          <p className="text-sm text-stone-400 mt-1">
            Paste any long URL and get a clean short link instantly.
          </p>
        </div>

        {/* Input form */}
        <div className="card px-5 py-5 mb-8">
          <form onSubmit={handleShorten} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Link2
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
              />
              <input
                id="input-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-very-long-url.com/..."
                className="input-field pl-9"
              />
            </div>
            <button
              id="btn-shorten"
              type="submit"
              disabled={loading}
              className="btn-primary shrink-0"
            >
              {loading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <>Shorten <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          {/* Feedback messages */}
          {error && (
            <div className="mt-3 flex items-start gap-2 text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              <AlertCircle size={13} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="mt-3 text-xs text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2 font-medium">
              ✓ {success}
            </div>
          )}
        </div>

        {/* Links list */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-stone-700">
              Recent links
              {links.length > 0 && (
                <span className="ml-2 badge bg-stone-100 text-stone-500">{links.length}</span>
              )}
            </h3>
            {links.length > 0 && (
              <button
                id="btn-clear-links"
                onClick={() => persistLinks([])}
                className="text-xs text-stone-400 hover:text-red-400 transition"
              >
                Clear all
              </button>
            )}
          </div>

          {links.length === 0 ? (
            <div className="card px-6 py-12 text-center">
              <Link2 size={28} className="mx-auto text-stone-300 mb-3" />
              <p className="text-sm text-stone-400">Your shortened links will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {links.map((item) => (
                <LinkCard key={item.shortId} item={item} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
