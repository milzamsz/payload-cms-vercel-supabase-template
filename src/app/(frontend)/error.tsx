'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Frontend Error]', error)
  }, [error])

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-5xl font-bold text-gray-900 mb-4">Something went wrong</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          We encountered an unexpected error. Please try again or return to the home page.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#4F772D] text-white font-semibold rounded-full hover:bg-[#3d5e23] transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  )
}
