import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-[#4F772D] font-bold uppercase tracking-widest text-sm mb-4">404</p>
        <h1 className="font-serif text-5xl font-bold text-gray-900 mb-4">Page not found</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-[#4F772D] text-white font-semibold rounded-full hover:bg-[#3d5e23] transition-colors"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}
