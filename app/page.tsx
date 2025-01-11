import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-bold">
              PayGuard
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="secondary">Sign in</Button>
            </Link>
            <Link href="/auth/login">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container py-24 space-y-8">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold sm:text-6xl">
              Secure Payment Management & Verification
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Streamline your payment processes with our comprehensive management and verification system.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/auth/login">
              <Button className="h-12 px-8">Get Started</Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="secondary" className="h-12 px-8">
                Sign in to Dashboard
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <div className="container py-24 space-y-16">
            <h2 className="text-3xl font-bold text-center">
              Everything you need to manage payments
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Secure Payments</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Process payments securely with advanced encryption and verification.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Document Verification</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Upload and verify documents with our automated system.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Real-time Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Track payments and monitor verification status in real-time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="container py-8">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} PayGuard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
