import { Copy, ExternalLink, BarChart2, Check } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LinkCard({ item }) {
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  const shortUrl = `http://localhost:8000/${item.shortId}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const truncate = (str, n = 52) =>
    str.length > n ? str.slice(0, n) + '…' : str

  return (
    <div className="card px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 animate-slide-up">
      {/* URL info */}
      <div className="flex-1 min-w-0">
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-brand-600 hover:underline"
        >
          {shortUrl}
        </a>
        <p className="mt-0.5 text-xs text-stone-400 truncate">{truncate(item.url)}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          id={`btn-copy-${item.shortId}`}
          onClick={handleCopy}
          title="Copy short URL"
          className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-700 transition"
        >
          {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
        </button>

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          title="Open original URL"
          className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-700 transition"
        >
          <ExternalLink size={15} />
        </a>

        <button
          id={`btn-analytics-${item.shortId}`}
          onClick={() => navigate(`/analytics/${item.shortId}`)}
          title="View analytics"
          className="p-2 rounded-lg hover:bg-brand-50 text-stone-500 hover:text-brand-600 transition"
        >
          <BarChart2 size={15} />
        </button>
      </div>
    </div>
  )
}
