import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Gappy</h1>
        <p className="text-xl text-gray-600 mb-8">
          AI-powered gap-time things-to-do platform for travelers in Japan
        </p>
        <Link
          href="/explore"
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors inline-block"
        >
          Explore Activities
        </Link>
      </div>
    </main>
  )
}
