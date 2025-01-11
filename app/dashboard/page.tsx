'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'admin') {
        router.replace('/dashboard/admin')
      } else {
        router.replace('/dashboard/payments')
      }
    }
  }, [user, loading, router])

  // Show loading state while redirecting
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin h-8 w-8 border-4 border-primary-600 border-l-transparent rounded-full" />
    </div>
  )
} 