'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'

export default function DashboardLayout({
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary-600 border-l-transparent rounded-full" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  async function handleSignOut() {
    try {
      await signOut()
      router.push('/auth/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
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
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-700"
            >
              Overview
            </Link>
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
           
          </nav>

          <div className="pt-4 border-t border-gray-700">
            <div className="px-4 py-2 mb-4">
              <p className="text-sm font-medium">{user.email}</p>
              <p className="text-xs text-gray-400 capitalize">{user.role}</p>
            </div>
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-100">
        {children}
      </main>
    </div>
  )
} 