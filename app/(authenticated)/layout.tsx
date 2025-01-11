'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [loading, user, router])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary-600 border-l-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="h-full flex flex-col">
          <div className="mb-8">
            <h1 className="text-xl font-bold">PayGuard</h1>
          </div>

          <nav className="space-y-1 flex-1">
            {user.role === 'admin' ? (
              <>
                <Link
                  href="/dashboard/admin"
                  className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-700"
                >
                  Admin Panel
                </Link>
                <Link
                  href="/dashboard/documents"
                  className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-700"
                >
                  Documents
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard/payments"
                  className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-700"
                >
                  Payments
                </Link>
                <Link
                  href="/dashboard/documents"
                  className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-700"
                >
                  Documents
                </Link>
              </>
            )}
          </nav>

          <button
            onClick={() => signOut()}
            className="mt-auto px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50">
        {children}
      </main>
    </div>
  )
} 