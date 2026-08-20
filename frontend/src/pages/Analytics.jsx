import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, BarChart2, Link2, ExternalLink,
  MousePointerClick, Clock, TrendingUp, Copy, Check, Loader2
} from 'lucide-react'
import Navbar from '../components/Navbar'

const API_BASE = 'http://localhost:8000'

function StatCard({ icon: Icon, label, value, sub, accent = false }) {
  return (
    <div className={`card px-5 py-5 flex items-start gap-4 ${accent ? 'border-brand-200 bg-brand-50/40' : ''}`}>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
        accent ? 'bg-brand-600 text-white' : 'bg-stone-100 text-stone-500'
      }`}>
        <Icon size={17} />
      </div>
      <div>
        <p className="text-xs text-stone-400 font-medium">{label}</p>
        <p className={`text-2xl font-semibold mt-0.5 ${accent ? 'text-brand-700' : 'text-stone-900'}`}>
          {value}
        </p>
        {sub && <p className="text-xs text-stone-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

export default function Analytics() {
  const { shortId } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  // Get original URL from localStorage (saved during shorten)
  const links = JSON.parse(localStorage.getItem('snipzy_links') || '[]')
  const linkMeta = links.find((l) => l.shortId === shortId)

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${API_BASE}/${shortId}/analytics`)
        const json = await res.json()
        if (!res.ok) {
          setError(json.message || 'Failed to load analytics.')
          return
        }
        setData(json)
      } catch {
        setError('Could not reach the server. Make sure it is running on localhost:8000.')
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [shortId])

  const shortUrl = `${API_BASE}/${shortId}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const createdAt = linkMeta?.createdAt
    ? new Date(linkMeta.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
      })
    : '—'

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
        {/* Back + heading */}
        <button
          id="btn-back"
          onClick={() => navigate('/')}
          className="btn-ghost text-xs px-3 py-1.5 mb-6 -ml-1"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div className="mb-7">
          <div className="flex items-center gap-2 mb-1">
            <BarChart2 size={17} className="text-brand-600" />
            <h2 className="text-xl font-semibold text-stone-900">Analytics</h2>
          </div>
          <p className="text-sm text-stone-400">Performance overview for your shortened link.</p>
        </div>

        {/* Short URL card */}
        <div className="card px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 mb-7">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-stone-400 mb-0.5">Short URL</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-brand-600 hover:underline"
            >
              {shortUrl}
            </a>
            {linkMeta?.url && (
              <p className="text-xs text-stone-400 mt-0.5 truncate">{linkMeta.url}</p>
            )}
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              id="btn-copy-analytics"
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-700 transition"
            >
              {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
            </button>
            {linkMeta?.url && (
              <a
                href={linkMeta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-700 transition"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Stats */}
        {loading ? (
          <div className="flex items-center justify-center py-16 text-stone-400">
            <Loader2 size={22} className="animate-spin mr-2" />
            <span className="text-sm">Loading analytics…</span>
          </div>
        ) : error ? (
          <div className="card px-5 py-10 text-center">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        ) : (
          <div className="space-y-5 animate-slide-up">
            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                icon={MousePointerClick}
                label="Total clicks"
                value={data?.analytics ?? 0}
                sub="All time"
                accent
              />
              <StatCard
                icon={Clock}
                label="Created on"
                value={createdAt}
              />
              <StatCard
                icon={TrendingUp}
                label="Short ID"
                value={shortId}
                sub="Unique identifier"
              />
            </div>

            {/* Engagement bar */}
            {(data?.analytics ?? 0) > 0 && (
              <div className="card px-5 py-5">
                <p className="text-xs font-medium text-stone-500 mb-3">Click engagement</p>
                <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full transition-all duration-700"
                    style={{ width: `${Math.min((data.analytics / 100) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs text-stone-400">0</span>
                  <span className="text-xs text-stone-400">{data?.analytics} clicks</span>
                </div>
              </div>
            )}

            {/* Empty state for 0 clicks */}
            {(data?.analytics ?? 0) === 0 && (
              <div className="card px-6 py-10 text-center">
                <MousePointerClick size={28} className="mx-auto text-stone-300 mb-3" />
                <p className="text-sm text-stone-400">No clicks yet. Share your link to start tracking.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
